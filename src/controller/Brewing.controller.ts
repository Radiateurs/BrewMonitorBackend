import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Brewing } from "../entity/Brewing.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class BrewingController {

    /**
     * @fn getAll
     * @desc get every entries of the table
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        const brewingRepository = getRepository(Brewing);
        return brewingRepository.find().then(brewings => {
            response.status(200).send(brewings);
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
        const brewingRepository = getRepository(Brewing);
        return brewingRepository.findOne(request.params.id).then(brewing => {
            if (brewing === undefined) {
                response.status(404).send(new NotFoundError("Brewing", `Brewing with id ${request.params.id} not found`).GenerateError());
                return false;
            }
            response.status(200).send(brewing);
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
        const brewingRepository = getRepository(Brewing);
        return brewingRepository.save(request.body).then(brewing => {
            response.status(201).send(brewing);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Brewing", err).GenerateError());
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
        const brewingRepository = getRepository(Brewing);
        // Get the entry by ID
        return brewingRepository.findOne(request.body.id).then(brewing => {
            // Modify the field of the entry
            brewing.fermentor = request.body.fermentor;
            brewing.started = request.body.started;
            brewing.receipe = request.body.receipe;
            brewing.user = request.body.user;
            // save the modified entry
            return brewingRepository.save(brewing).then(brewing => {
                response.status(200).send(brewing);
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
        const brewingRepository = getRepository(Brewing);
        // Get the entry by its ID
        return brewingRepository.findOne(request.body.id).then(brewingToRemove => {
            if (brewingToRemove === undefined) {
                response.status(404).send(new NotFoundError("Brewing", `Brewing with id ${request.body.id} not found`).GenerateError());
                return false;
            }
            // remove it
            brewingRepository.remove(brewingToRemove).then(() => {
                response.status(200).send();
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError(`Removing an entry on Brewing of id ${request.body.id}`, err).GenerateError());
                return false;
            });
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

}