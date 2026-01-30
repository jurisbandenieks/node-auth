import { config } from "../config/index";
import argon2 from "argon2";

export async function hashPassword(plainText: string) {
  const toHash = plainText + config.appPepper;

  return argon2.hash(toHash, {
    type: argon2.argon2id,
  });
}
export async function verifyPassword(plainText: string, hash: string) {
  const toVerify = plainText + config.appPepper;
  return argon2.verify(hash, toVerify);
}
