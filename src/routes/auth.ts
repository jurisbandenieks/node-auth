import express from "express";
import { validatedBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../utils/authValidator";
import { login, register } from "../controllers/authController";

const router = express.Router();

router.post("/register", validatedBody(registerSchema), register);
router.post("/login", validatedBody(loginSchema), login);

export default router;
