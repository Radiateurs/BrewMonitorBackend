import { Router } from "express"
import AuthRouter from "./router/Auth.router"
import UserRouter from "./router/User.router"
import BrewingRouter from "./router/Brewing.router"
import FermentorRouter from "./router/Fermentor.router"
import IngredientRouter from "./router/Ingredient.router"
import ReceipeRouter from "./router/Receipe.router"
import ReceipeIngredientRouter from "./router/ReceipeIngredient.router"

const IndexRouter = Router();

IndexRouter.use("/users/", UserRouter);
IndexRouter.use("/auth/", AuthRouter);
IndexRouter.use("/brewing/", AuthRouter);
IndexRouter.use("/auth/", AuthRouter);

export default (IndexRouter);