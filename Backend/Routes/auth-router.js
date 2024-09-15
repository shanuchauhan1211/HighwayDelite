import express from "express";
const router = express.Router();
import {CreateUser,logIn, verifyOtp} from "../Controllers/auth-controller.js";
router.post("/NewUser",CreateUser);
router.route("/logIn").post(logIn);
router.post("/verifyEmail",verifyOtp);


export default router;