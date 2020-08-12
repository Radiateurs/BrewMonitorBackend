import { getRepository } from "typeorm";
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
    static getAll = async function(request: Request, response: Response, next: NextFunction) {
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
    static getOne = async function(request: Request, response: Response, next: NextFunction) {
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
    static create = async function(request: Request, response: Response, next: NextFunction) {
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
    static update = async function(request: Request, response: Response, next: NextFunction) {
        const fermentorRepository = getRepository(Fermentor);
        // Get the entry by ID
        return fermentorRepository.findOne(request.body.id).then(fermentor => {
            // Modify the field of the entry
            fermentor.name = request.body.name;
            fermentor.capacity = request.body.capacity;
            fermentor.owner = request.body.owner;
            fermentor.brewing = request.body.brewing;
            fermentor.temperature = request.body.temperature;
            fermentor.token = request.body.token;
            // save the modified entry
            return fermentorRepository.save(fermentor).then(fermentor => {
                response.status(200).send(fermentor);
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError("Creating a new entry on Brewing", err).GenerateError());
                return false;
            });
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Brewing", err).GenerateError());
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
    static remove = async function(request: Request, response: Response, next: NextFunction) {
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
