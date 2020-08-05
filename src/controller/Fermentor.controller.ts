import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Fermentor} from "../entity/Fermentor.entity";

export class FermentorController {

    private fermentorRepository = getRepository(Fermentor);

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        return this.fermentorRepository.find();
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        return this.fermentorRepository.findOne(request.params.id);
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        return this.fermentorRepository.save(request.body);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const fermentorToRemove = await this.fermentorRepository.findOne(request.params.id);
        await this.fermentorRepository.remove(fermentorToRemove);
    }

}