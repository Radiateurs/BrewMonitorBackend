import { Router, Request, Response } from "express";
import { AuthController } from "../controller/Auth.controller"

const AuthRouter = Router();

AuthRouter.get("/login", AuthController.connect);
AuthRouter.post("/signin", AuthController.signin);
AuthRouter.get("/logoff", AuthController.disconnect);

export default AuthRouter;