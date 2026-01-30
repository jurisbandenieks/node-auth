import { nanoid } from "nanoid";
import { redis } from "../config/redis";
import { USER_PREFIX, USERID_PREFIX } from "../constants/redis";

export async function getUserByUsername(username: string) {
  return await redis.get(`${USER_PREFIX}:${username}`);
}

export async function createUser(username: string, passwordHash: string) {
  const id = nanoid();
  const key = `${USERID_PREFIX}:${id}`;
  const now = new Date().toISOString();

  await redis.hSet(key, {
    id,
    username,
    passwordHash,
    createdAt: now,
  });

  await redis.set(`${USER_PREFIX}:${username}`, id);
  return id;
}
