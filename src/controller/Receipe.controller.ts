import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Receipe } from "../entity/Receipe.entity";

export class ReceipeController {

    private receipeRepository = getRepository(Receipe);

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        return this.receipeRepository.find();
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        return this.receipeRepository.findOne(request.params.id);
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        return this.receipeRepository.save(request.body);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const receipeToRemove = await this.receipeRepository.findOne(request.params.id);
        await this.receipeRepository.remove(receipeToRemove);
    }

}