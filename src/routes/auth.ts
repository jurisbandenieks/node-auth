import express from "express";
import { validatedBody } from "../middleware/validate";
import { registerSchema } from "../utils/authValidator";
import { register } from "../controllers/authController";

const router = express.Router();

router.post("/register", validatedBody(registerSchema), register);

export default router;
