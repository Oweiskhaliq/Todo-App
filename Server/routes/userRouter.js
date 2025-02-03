import { Router } from "express";
import {
  AddTodoContorller,
  loginController,
  registerController,
  getTodoListController,
  deleteTodoController,
} from "../controllers/todoControllers.js";
import passport from "passport";

const usersRouter = Router();

//register user routes
usersRouter.post("/register", registerController);
usersRouter.post("/login", loginController);
usersRouter.post(
  "/add-todo",
  passport.authenticate("jwt", { session: false }),
  AddTodoContorller
);
usersRouter.get(
  "/get-todo",
  passport.authenticate("jwt", { session: false }),
  getTodoListController
);
usersRouter.delete(
  "/todo/:todo_id",
  passport.authenticate("jwt", { session: false }),
  deleteTodoController
);
//

export default usersRouter;
