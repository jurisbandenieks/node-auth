import { Request, Response } from "express";
import { UserModel } from "../types/user-model";
import { createUser, getUserByUsername } from "../services/userService";
import { hashPassword, verifyPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import { config } from "../config";

export async function register(req: Request, res: Response) {
  try {
    const body = req.body as UserModel;
    const { username, password } = body;

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    if (password.toLocaleLowerCase().includes(username.toLocaleLowerCase())) {
      return res.status(400).json({ message: "Password cannot contain the username" });
    }

    const passwordHash = await hashPassword(password);
    const userId = await createUser(username, passwordHash);

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const body = req.body as { username: string; password: string };
    const { username, password } = body;

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const verified = await verifyPassword(password, user.passwordHash);

    if (!verified) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ token, expiresIn: 3600, user: payload });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
