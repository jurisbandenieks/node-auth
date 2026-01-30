import { Request, Response } from "express";
import { UserModel } from "../types/user-model";
import { createUser, getUserByUsername } from "../services/userService";
import { hashPassword } from "../utils/password";

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
