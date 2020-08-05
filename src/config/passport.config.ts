import * as passport from "passport";
import * as passportLocal  from "passport-local";
import * as passportFacebook from "passport-facebook";
import _ from "lodash";

import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";
import { Request, Response, NextFunction } from "express";
import {NotFoundError} from "../errors/NotFound.error";

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const userRepository = getRepository(User);

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await userRepository.findOne(id);
    if (user == undefined) {
        return done(new NotFoundError("User", `User ${id} was not found`).GenerateError(), user);
    }
    return done(undefined, user);
});

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const user = await userRepository.createQueryBuilder("user").where("user.email = :email",{ email: email.toLowerCase() }).getOne();
    if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) { return done(err); }
        if (isMatch) {
            return done(undefined, user);
        }
        return done(undefined, false, { message: "Invalid email or password." });
    });
}));

/**
 * Authentication Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    const user = req.user as User;
    if (_.find(user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};