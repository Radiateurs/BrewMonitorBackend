import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User.entity";
import {NotFoundError} from "../errors/NotFound.error";

export class UserController {

    static getAll = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        const toSend: any[] = [];
        // Remove confidential info and add to the list to send
        users.forEach(user => {
            const userCpy = Object.assign({}, user);
            delete userCpy.pass;
            delete userCpy.email;
            toSend.push(userCpy);
        });
        response.status(200).send(toSend);
    }

    static getOne = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(request.params.id);
        if (user == undefined) {
            response.status(404).send(new NotFoundError("User", `User ${request.params.id} was not found`).GenerateError());
            return;
        }
        const userCpy = Object.assign({}, user);
        delete userCpy.pass;
        delete userCpy.email;
        response.status(200).send(user);
        return;
    }

    static create = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const retVal =  await userRepository.save(request.body);
        console.log(retVal);
        response.status(200).send(retVal);
    }

    static remove = async function(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const userToRemove = await userRepository.findOne(request.params.id);
        await userRepository.remove(userToRemove);
    }

}