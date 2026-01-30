import { config } from "../config/index";
import argon2 from "argon2";

export async function hashPassword(plainTextPassword: string) {
  const toHash = plainTextPassword + config.appPepper;

  return argon2.hash(toHash, {
    type: argon2.argon2id,
  });
}
export async function verifyPassword(plainTextPassword: string, hash: string) {
  const toVerify = plainTextPassword + config.appPepper;
  return argon2.verify(hash, toVerify);
}
