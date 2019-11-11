import { Router } from "express";
import { UserController } from "../controller/User.controller";

const UserRouter = Router();

UserRouter.get("/", UserController.getAll)
UserRouter.get("/:id([0-9]+)", UserController.getOne)
UserRouter.post("/", UserController.create)
UserRouter.delete("/", UserController.remove)

export default UserRouter;