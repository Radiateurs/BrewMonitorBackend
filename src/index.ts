import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import {Request, Response, NextFunction } from "express";
import passport from "passport";

import IndexRouter from "./routes";
import {User} from "./entity/User.entity";

import * as passeportConf from "./config/passport.config";

createConnection().then(async connection => {

    console.log("Connected to DB!");

    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((request: Request, response: Response, next: NextFunction) => {
        response.locals.user = request.user;
        next();
    });

    app.use("/", IndexRouter);

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/user to see results");

}).catch(error => console.log(error));
