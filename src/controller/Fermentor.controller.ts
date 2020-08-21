import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Fermentor } from "../entity/Fermentor.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class FermentorController {

    /**
     * @fn getAll
     * @desc get every entries of the table
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static getAll = (request: Request, response: Response, next: NextFunction) => {
        const fermentorRepository = getRepository(Fermentor);
        return fermentorRepository.find().then(fermentors => {
            response.status(200).send(fermentors);
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
        const fermentorRepository = getRepository(Fermentor);
        return fermentorRepository.findOne(request.params.id).then(fermentor => {
            if (fermentor === undefined) {
                response.status(404).send(new NotFoundError("Fermentor", `Fermentor with id ${request.params.id} not found`).GenerateError());
                return false;
            }
            response.status(200).send(fermentor);
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
        const fermentorRepository = getRepository(Fermentor);
        return fermentorRepository.save(request.body).then(fermentor => {
            response.status(200).send(fermentor);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Fermentor", err).GenerateError());
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
    static update = async function(request: Request, response: Response, next: NextFunction){
        const fermentorRepository = getRepository(Fermentor);
        const oldFermentor = await fermentorRepository.findOne(request.body.id);
        if (oldFermentor == undefined) {
            response.status(404).send(new NotFoundError("Fermentor", `Fermentor ${request.body.id} was not found`).GenerateError());
            return false;
        }
        fermentorRepository.merge(oldFermentor, request.body);
        fermentorRepository.save(oldFermentor).then(updatedFermentor => {
            response.status(200).send(updatedFermentor);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Fermentor", err).GenerateError());
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
        const fermentorRepository = getRepository(Fermentor);
        return fermentorRepository.findOne(request.body.id).then(fermentorToRemove => {
            if (fermentorToRemove === undefined) {
                response.status(404).send(new NotFoundError("Fermentor", `Fermentor with id ${request.body.id} not found`).GenerateError());
                return false;
            }
            fermentorRepository.remove(fermentorToRemove).then(() => {
                response.status(200).send();
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError(`Removing an entry on Fermentor of id ${request.body.id}`, err).GenerateError());
                return false;
            });
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

}
