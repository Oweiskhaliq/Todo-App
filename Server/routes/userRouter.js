import { Router } from "express";
import {  loginController, registerController } from "../controllers/todoControllers.js";
import passport  from "passport";



const usersRouter = Router();


//register user routes
usersRouter.post("/register", registerController);
usersRouter.post("/login", loginController);


export default usersRouter;
