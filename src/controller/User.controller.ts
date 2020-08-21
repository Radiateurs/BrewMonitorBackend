import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User.entity";
import { NotFoundError } from "../errors/NotFound.error";
import { InternalError } from "../errors/InternalError.error";

export class UserController {

    static getAll = (request: Request, response: Response, next: NextFunction) => {
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

    static getOne = (request: Request, response: Response, next: NextFunction) => {
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
     * @desc Create an new entry
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 201) false on every other cases.
     */
    static create = (request: Request, response: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        return userRepository.save(request.body).then(retVal => {
            response.status(201).send(retVal);
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    /**
     * @fn update
     * @desc Update an entry by its ID
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static update = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const oldUser = await userRepository.findOne(request.body.id);
        if (oldUser == undefined) {
            response.status(404).send(new NotFoundError("User", `User ${request.body.id} was not found`).GenerateError());
            return false;
        }
        userRepository.merge(oldUser, request.body);
        userRepository.save(oldUser).then(updatedUser => {
            response.status(200).send(updatedUser);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on User", err).GenerateError());
            return false;
        });
    }

    /**
     * @fn remove
     * @desc Erase an entry by its ID
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static remove = (request: Request, response: Response, next: NextFunction) => {
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