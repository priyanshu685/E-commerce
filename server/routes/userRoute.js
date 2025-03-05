import { Router } from "express";
import { registerUserController, loginController, logoutController } from "../controllers/userController.js"; // <-- Add .js

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);

export default userRouter;
