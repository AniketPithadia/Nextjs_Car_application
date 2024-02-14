import express from "express";
import { signOut, signin, signup } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);
export default router;
