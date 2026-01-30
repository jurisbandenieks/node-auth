import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../types/user-model";
import { createUser, getUserByUsername } from "../services/userService";
import { hashPassword, verifyPassword } from "../utils/password";
import { config } from "../config";

// @desc    Insert new user
// @route   POST /api/register
// @access  Public access route
export async function register(req: Request, res: Response) {
  try {
    // Destructure user data from request
    const body = req.body as UserModel;
    const { username, password } = body;

    // Check if user already exists
    const existingUser = await getUserByUsername(username);
    // If user exists, return 409 error
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Prevent username being part of the password
    if (password.toLocaleLowerCase().includes(username.toLocaleLowerCase())) {
      return res.status(400).json({ message: "Password cannot contain the username" });
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userId = await createUser(username, passwordHash);

    // Respond with success message and user ID
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// @desc    Authenticate user and return JWT token
// @route   POST /api/login
// @access  Public access route
export async function login(req: Request, res: Response) {
  try {
    // Destructure user data from request
    const body = req.body as { username: string; password: string };
    const { username, password } = body;

    // Find user from DB
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Verify ussr password
    const verified = await verifyPassword(password, user.passwordHash);

    // If failed, return 401 invalid login
    if (!verified) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    // return success with JWT token
    res.status(200).json({ token, expiresIn: 3600, user: payload });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
