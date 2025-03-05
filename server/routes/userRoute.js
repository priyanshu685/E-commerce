import { Router } from "express";
import { registerUserController, loginController, logoutController } from "../controller/userController";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);

export default userRouter;
