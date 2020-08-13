import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as passport from "passport";
import { User } from "../entity/User.entity";
import { BadRequestError } from "../errors/BadRequest.error";

export class AuthController {

    static connect = async (request: Request, response: Response, next: NextFunction) => {
        // if (request.body.hasOwnProperty('email') == true && request.body.hasOwnProperty('pass') == true) {
        //     return response.status(400).send(new BadRequestError('connect', 'The body must contain a valid key \'pass\' and \'email\''))
        // }

        await passport.authenticate("local", (err: Error, user: any) => {
            if (err) { return next(err); }
            if (!user) {
                return response.status(401).send(new BadRequestError("connect", "Wrong password or email"));
            }
            request.logIn(user, (err) => {
                if (err) { return next(err); }
                return response.status(200).send({message: "You are logged in"});
            });
        })(request, response, next);        
    }

    static disconnect = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        return await userRepository.save(request.body);
    }

}