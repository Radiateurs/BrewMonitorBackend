import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import IndexRouter from "./routes";
import {User} from "./entity/User.entity";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.use("/", IndexRouter);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });

    // start express server
    app.listen(3000);

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        dateOfBirth: "12/25/1980",
        pass: null,
        email: null
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
