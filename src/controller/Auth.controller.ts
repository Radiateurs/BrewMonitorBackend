import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User.entity";

export class AuthController {

    private userRepository = getRepository(User);

    static connect = async function(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    static signin = async function(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    static disconnect = async function(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

}