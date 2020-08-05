import { Router } from "express";
import { ReceipeController } from "../controller/Receipe.controller";

const ReceipeRouter = Router();

ReceipeRouter.get("/", ReceipeController.getAll);
ReceipeRouter.get("/:id([0-9]+)", ReceipeController.getOne);
ReceipeRouter.post("/", ReceipeController.create);
ReceipeRouter.delete("/", ReceipeController.remove);

export default ReceipeRouter;