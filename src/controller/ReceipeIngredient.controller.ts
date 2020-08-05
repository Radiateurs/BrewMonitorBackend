import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ReceipeIngredient } from "../entity/ReceipeIngredient.entity";

export class ReceipeIngredientController {

    private receipeIngredientRepository = getRepository(ReceipeIngredient);

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        return this.receipeIngredientRepository.find();
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        return this.receipeIngredientRepository.findOne(request.params.id);
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        return this.receipeIngredientRepository.save(request.body);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const receipeIngredientToRemove = await this.receipeIngredientRepository.findOne(request.params.id);
        await this.receipeIngredientRepository.remove(receipeIngredientToRemove);
    }

}