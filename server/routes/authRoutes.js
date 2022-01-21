import express from "express";

import {signIn, signUp, verifyEmail} from "../controllers/authController.js"

const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.get("/verify/:confirmationCode", verifyEmail);

export default authRouter;