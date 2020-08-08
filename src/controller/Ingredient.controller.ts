import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entity/Ingredient.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class IngredientController {

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        const ingredientRepository = getRepository(Ingredient);
        return ingredientRepository.find().then(ingredients => {
            response.status(200).send(ingredients);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        const ingredientRepository = getRepository(Ingredient);
        return ingredientRepository.findOne(request.params.id).then(ingredient => {
            if (ingredient === undefined) {
                response.status(404).send(new NotFoundError("Ingredient", `Ingredient with id ${request.params.id} not found`).GenerateError());
                return false;
            }
            response.status(200).send(ingredient);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        const ingredientRepository = getRepository(Ingredient);
        return ingredientRepository.save(request.body).then(ingredient => {
            response.status(200).send(ingredient);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Ingredient", err).GenerateError());
            return false;
        });
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const ingredientRepository = getRepository(Ingredient);
        return ingredientRepository.findOne(request.body.id).then(ingredientToRemove => {
            if (ingredientToRemove === undefined) {
                response.status(404).send(new NotFoundError("Ingredient", `Ingredient with id ${request.body.id} not found`).GenerateError());
                return false;
            }
            ingredientRepository.remove(ingredientToRemove).then(() => {
                response.status(200).send();
                return true;
            }).catch(err => {
                response.status(400).send(new InternalError(`Removing an entry on Ingredient of id ${request.body.id}`, err).GenerateError());
                return false;
            });
        }).catch(err => {
            response.status(400).send(new InternalError("Database", err).GenerateError());
            return false;
        });
    }

}
