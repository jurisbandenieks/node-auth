import { nanoid } from "nanoid";
import { redis } from "../config/redis";
import { USER_PREFIX, USERID_PREFIX } from "../constants/redis";
import { UserRecordModel } from "../types/user-model";

// Find user by username
export async function getUserByUsername(username: string): Promise<UserRecordModel | null> {
  // Get user ID from username
  const id = await redis.get(`${USER_PREFIX}:${username}`);
  if (!id) return null;

  // get user record data
  return getUserById(id);
}

export async function getUserById(id: string): Promise<UserRecordModel | null> {
  // Get user data from DB by USERID_PREFIX
  const data = await redis.hGetAll(`${USERID_PREFIX}:${id}`);
  if (!data || Object.keys(data).length === 0) return null;
  return {
    id: data.id,
    username: data.username,
    passwordHash: data.passwordHash,
    createdAt: data.createdAt,
  };
}

// Create new user
export async function createUser(username: string, passwordHash: string) {
  // Generate unique ID for user
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
