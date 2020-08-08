import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User.entity";
import { NotFoundError } from "../errors/NotFound.error";
import { InternalError } from "../errors/InternalError.error";

export class UserController {

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        return userRepository.find().then(users => {
            const toSend: any[] = [];
            // Remove confidential info and add to the list to send
            users.forEach(user => {
                const userCpy = Object.assign({}, user);
                delete userCpy.pass;
                delete userCpy.email;
                toSend.push(userCpy);
            });
            response.status(200).send(toSend);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        return userRepository.findOne(request.params.id).then(user => {
            if (user == undefined) {
                response.status(404).send(new NotFoundError("User", `User ${request.params.id} was not found`).GenerateError());
                return false;
            }
            const userCpy = Object.assign({}, user);
            delete userCpy.pass;
            delete userCpy.email;
            response.status(200).send(userCpy);
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    /**
     * @fn create
     * @desc Create a user and adds it in the DB.
     * @returns {bool} true on success. False on error
     * @send 200 on success. 400 on error
     */
    static create = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        return userRepository.save(request.body).then(retVal => {
            response.status(200).send(retVal);
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        return userRepository.findOne(request.body.id).then(userToRemove => {
            if (userToRemove == undefined) {
                response.status(404).send(new NotFoundError("User", `User ${request.params.id} was not found`).GenerateError());
                return false;
            }
            userRepository.remove(userToRemove).then(() => {
                response.status(200).send();
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError("Database", err).GenerateError());
                return false;
            });

        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

}