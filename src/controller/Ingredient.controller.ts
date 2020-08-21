import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entity/Ingredient.entity";
import { NotFoundError, InternalError } from "../errors/Errors.error";

export class IngredientController {

    /**
     * @fn getAll
     * @desc get every entries of the table
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 200) false on every other cases.
     */
    static getAll = (request: Request, response: Response, next: NextFunction) => {
        const ingredientRepository = getRepository(Ingredient);
        return ingredientRepository.find().then(ingredients => {
            response.status(200).send(ingredients);
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

    /**
     * @fn create
     * @desc Create an new entry
     * @param {Request} request express request object
     * @param {Response} response express request object
     * @param {NextFunction} next express next function
     * @return {bool} true on success (status code == 201) false on every other cases.
     */
    static create = (request: Request, response: Response, next: NextFunction) => {
        const ingredientRepository = getRepository(Ingredient);
        return ingredientRepository.save(request.body).then(ingredient => {
            response.status(200).send(ingredient);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Ingredient", err).GenerateError());
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
        const ingredientRepository = getRepository(Ingredient);
        const oldIngredient = await ingredientRepository.findOne(request.body.id);
        if (oldIngredient == undefined) {
            response.status(404).send(new NotFoundError("Ingredient", `Ingredient ${request.body.id} was not found`).GenerateError());
            return false;
        }
        ingredientRepository.merge(oldIngredient, request.body);
        ingredientRepository.save(oldIngredient).then(updatedIngredient => {
            response.status(200).send(updatedIngredient);
            return true;
        }).catch(err => {
            response.status(400).send(new InternalError("Creating a new entry on Ingredient", err).GenerateError());
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
