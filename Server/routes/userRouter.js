import { Router } from "express";
import { registerController, test } from "../controllers/todoControllers.js";

const usersRouter = Router();

usersRouter.get("/", test);
//register user routes
usersRouter.post("/register", registerController);

export default usersRouter;
