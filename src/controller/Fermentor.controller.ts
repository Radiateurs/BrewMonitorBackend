import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Fermentor } from "../entity/Fermentor.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class FermentorController {

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
