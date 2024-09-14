import express from "express";
const router = express.Router();
import {CreateUser,logIn} from "../Controllers/auth-controller.js";
router.post("/NewUser",CreateUser);
router.route("/logIn").post(logIn);

export default router;