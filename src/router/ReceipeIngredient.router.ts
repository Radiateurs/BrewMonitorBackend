import { Router } from "express";
import { ReceipeIngredientController } from "../controller/ReceipeIngredient.controller";

const ReceipeIngredientRouter = Router();

ReceipeIngredientRouter.get("/", ReceipeIngredientController.getAll);
ReceipeIngredientRouter.get("/:id([0-9]+)", ReceipeIngredientController.getOne);
ReceipeIngredientRouter.post("/", ReceipeIngredientController.create);
ReceipeIngredientRouter.put("/", ReceipeIngredientController.update);
ReceipeIngredientRouter.delete("/", ReceipeIngredientController.remove);

export default ReceipeIngredientRouter;