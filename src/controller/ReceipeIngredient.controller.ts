import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ReceipeIngredient } from "../entity/ReceipeIngredient.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class ReceipeIngredientController {

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
