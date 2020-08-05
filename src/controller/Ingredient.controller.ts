import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entity/Ingredient.entity";

export class IngredientController {

    private ingredientRepository = getRepository(Ingredient);

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        return this.ingredientRepository.find();
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        return this.ingredientRepository.findOne(request.params.id);
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        return this.ingredientRepository.save(request.body);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const ingredientToRemove = await this.ingredientRepository.findOne(request.params.id);
        await this.ingredientRepository.remove(ingredientToRemove);
    }

}