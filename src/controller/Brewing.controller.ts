import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Brewing } from "../entity/Brewing.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class BrewingController {

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

    static create = async function(request: Request, response: Response, next: NextFunction) {
        const brewingRepository = getRepository(Brewing);
        return brewingRepository.save(request.body).then(brewing => {
            response.status(200).send(brewing);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Brewing", err).GenerateError());
            return false;
        });
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const brewingRepository = getRepository(Brewing);
        return brewingRepository.findOne(request.body.id).then(brewingToRemove => {
            if (brewingToRemove === undefined) {
                response.status(404).send(new NotFoundError("Brewing", `Brewing with id ${request.body.id} not found`).GenerateError());
                return false;
            }
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