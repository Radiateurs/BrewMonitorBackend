import { Router, Request, Response } from "express";
import { AuthController } from "../controller/Auth.controller"

const AuthRouter = Router();

AuthRouter.get("/login", AuthController.connect);
AuthRouter.get("/logoff", AuthController.disconnect);

export default AuthRouter;