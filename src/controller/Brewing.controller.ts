import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Brewing } from "../entity/Brewing.entity";

export class BrewingController {

    private brewingRepository = getRepository(Brewing);

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        return this.brewingRepository.find();
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        return this.brewingRepository.findOne(request.params.id);
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        return this.brewingRepository.save(request.body);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        let brewingToRemove = await this.brewingRepository.findOne(request.params.id);
        await this.brewingRepository.remove(brewingToRemove);
    }

}