import { Router } from "express";
import { BrewingController } from "../controller/Brewing.controller";

const BrewingRouter = Router();

BrewingRouter.get("/", BrewingController.getAll)
BrewingRouter.get("/:id([0-9]+)", BrewingController.getOne)
BrewingRouter.post("/", BrewingController.create)
BrewingRouter.delete("/", BrewingController.remove)

export default BrewingRouter;