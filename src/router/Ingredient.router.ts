import { Router } from "express";
import { IngredientController } from "../controller/Ingredient.controller";

const IngredientRouter = Router();

IngredientRouter.get("/", IngredientController.getAll)
IngredientRouter.get("/:id([0-9]+)", IngredientController.getOne)
IngredientRouter.post("/", IngredientController.create)
IngredientRouter.delete("/", IngredientController.remove)

export default IngredientRouter;