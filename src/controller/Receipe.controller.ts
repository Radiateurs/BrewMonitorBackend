import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Receipe } from "../entity/Receipe.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class ReceipeController {

    /**
     * @fn getAll
     * @desc get every entries of the table
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static getAll = (request: Request, response: Response, next: NextFunction) => {
        const receipeRepository = getRepository(Receipe);
        return receipeRepository.find().then(receipes => {
            response.status(200).send(receipes);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    /**
     * @fn getOne
     * @desc Get an entry by its ID
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static getOne = (request: Request, response: Response, next: NextFunction) => {
        const receipeRepository = getRepository(Receipe);
        return receipeRepository.findOne(request.params.id).then(receipe => {
            if (receipe === undefined) {
                response.status(404).send(new NotFoundError("Receipe", `Receipe with id ${request.params.id} not found`).GenerateError());
                return false;
            }
            response.status(200).send(receipe);
            return true;
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
        const receipeRepository = getRepository(Receipe);
        return receipeRepository.save(request.body).then(receipe => {
            response.status(200).send(receipe);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Receipe", err).GenerateError());
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
        const receipeRepository = getRepository(Receipe);
        const oldReceipe = await receipeRepository.findOne(request.body.id);
        if (oldReceipe == undefined) {
            response.status(404).send(new NotFoundError("Receipe", `Receipe ${request.body.id} was not found`).GenerateError());
            return false;
        }
        receipeRepository.merge(oldReceipe, request.body);
        receipeRepository.save(oldReceipe).then(updatedReceipe => {
            response.status(200).send(updatedReceipe);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Receipe", err).GenerateError());
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
        const receipeRepository = getRepository(Receipe);
        return receipeRepository.findOne(request.body.id).then(receipeToRemove => {
            if (receipeToRemove === undefined) {
                response.status(404).send(new NotFoundError("Receipe", `Receipe with id ${request.body.id} not found`).GenerateError());
                return false;
            }
            receipeRepository.remove(receipeToRemove).then(() => {
                response.status(200).send();
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError(`Removing an entry on Receipe of id ${request.body.id}`, err).GenerateError());
                return false;
            });
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

}
