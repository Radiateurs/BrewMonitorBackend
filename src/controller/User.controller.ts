import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User.entity";

export class UserController {

    private userRepository = getRepository(User);

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}