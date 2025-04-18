import { Router } from "express";
import { registerUserController, loginController, logoutController, getAllUsersController } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);
userRouter.get("/getAllUsers", getAllUsersController);

export default userRouter;
