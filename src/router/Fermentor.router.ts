import { Router } from "express";
import { FermentorController } from "../controller/Fermentor.controller";

const FermentorRouter = Router();

FermentorRouter.get("/", FermentorController.getAll);
FermentorRouter.get("/:id([0-9]+)", FermentorController.getOne);
FermentorRouter.post("/", FermentorController.create);
FermentorRouter.delete("/", FermentorController.remove);

export default FermentorRouter;