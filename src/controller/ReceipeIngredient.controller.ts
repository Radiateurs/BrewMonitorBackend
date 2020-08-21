import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ReceipeIngredient } from "../entity/ReceipeIngredient.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class ReceipeIngredientController {

    /**
     * @fn getAll
     * @desc get every entries of the table
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static getAll = (request: Request, response: Response, next: NextFunction) => {
        const receipeIngredientRepository = getRepository(ReceipeIngredient);
        return receipeIngredientRepository.find().then(receipeIngredients => {
            response.status(200).send(receipeIngredients);
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
        const receipeIngredientRepository = getRepository(ReceipeIngredient);
        return receipeIngredientRepository.findOne(request.params.id).then(receipeIngredient => {
            if (receipeIngredient === undefined) {
                response.status(404).send(new NotFoundError("ReceipeIngredient", `ReceipeIngredient with id ${request.params.id} not found`).GenerateError());
                return false;
            }
            response.status(200).send(receipeIngredient);
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
        const receipeIngredientRepository = getRepository(ReceipeIngredient);
        return receipeIngredientRepository.save(request.body).then(receipeIngredient => {
            response.status(200).send(receipeIngredient);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on ReceipeIngredient", err).GenerateError());
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
        const receipeIngredientRepository = getRepository(ReceipeIngredient);
        const oldReceipeIngredient = await receipeIngredientRepository.findOne(request.body.id);
        if (oldReceipeIngredient == undefined) {
            response.status(404).send(new NotFoundError("ReceipeIngredient", `ReceipeIngredient ${request.body.id} was not found`).GenerateError());
            return false;
        }
        receipeIngredientRepository.merge(oldReceipeIngredient, request.body);
        receipeIngredientRepository.save(oldReceipeIngredient).then(updatedReceipeIngredient => {
            response.status(200).send(updatedReceipeIngredient);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on ReceipeIngredient", err).GenerateError());
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
        const receipeIngredientRepository = getRepository(ReceipeIngredient);
        return receipeIngredientRepository.findOne(request.body.id).then(receipeIngredientToRemove => {
            if (receipeIngredientToRemove === undefined) {
                response.status(404).send(new NotFoundError("ReceipeIngredient", `ReceipeIngredient with id ${request.body.id} not found`).GenerateError());
                return false;
            }
            receipeIngredientRepository.remove(receipeIngredientToRemove).then(() => {
                response.status(200).send();
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError(`Removing an entry on ReceipeIngredient of id ${request.body.id}`, err).GenerateError());
                return false;
            });
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

}
