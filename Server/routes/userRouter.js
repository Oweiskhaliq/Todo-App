import { Router } from "express";
import { registerController } from "../controllers/todoControllers.js";

const usersRouter = Router();


//register user routes
usersRouter.post("/register", registerController);

export default usersRouter;
