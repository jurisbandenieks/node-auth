import { config } from "../config/index";
import argon2 from "argon2";

// Hide password with pepper and hash it
export async function hashPassword(plainTextPassword: string) {
  const toHash = plainTextPassword + config.appPepper;

  return argon2.hash(toHash, {
    type: argon2.argon2id,
  });
}

// Decode passwrd hash and verify agains plain text password
export async function verifyPassword(plainTextPassword: string, hash: string) {
  const toVerify = plainTextPassword + config.appPepper;
  return argon2.verify(hash, toVerify);
}
