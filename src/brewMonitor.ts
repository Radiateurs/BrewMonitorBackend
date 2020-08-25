import { createConnection, Connection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { Request, Response, NextFunction, Application, Router } from "express";
import passport from "passport";
import { User } from "./entity/User.entity";

import * as passeportConf from "./config/passport.config";

export class BrewMonitorApp {

    private connection: Connection;
    private app: Application;
    public option: { orm: any; port: number; };

    // create app
    constructor(option: { orm: any; port: number; } | null) {
        this.option = option;
        this.app = express();
    }

    // Setup routers, connect to DB and third party for the app.
    public async setup(router: Router) {
        try {
            this.connection = await createConnection(this.option.orm);
        } catch (error) {
            console.error(error);
            process.exit();
        }
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use((request: Request, response: Response, next: NextFunction) => {
            response.locals.user = request.user;
            next();
        });

        this.app.use('/', router);        
    }

    // start the app and return a Promise on the listen method
    public start() {
        var that = this;
        return new Promise((resolve, reject) => {
            that.app.listen(that.option.port, (err) => {
                if (err) reject(err);
                else resolve();
            })
        });
    }
}