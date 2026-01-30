import { createClient } from "redis";
import { config } from "./index";

export const redis = createClient({
  url: config.redisURL,
  password: config.redisPassword,
});

redis.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export async function connectRedis() {
  if (!redis.isOpen) await redis.connect();
}
