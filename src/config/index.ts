import dotenv from "dotenv";

dotenv.config();

const { PORT, REDIS_URL, REDIS_PASSWORD, APP_PEPPER, NODE_ENV = "development" } = process.env;

if (!REDIS_URL) throw new Error("Missing required env: REDI_URL");

if (!APP_PEPPER) throw new Error("Missing required env: APP_PEPPER");

export const config = {
  port: Number(PORT ?? 3000),
  redisURL: REDIS_URL,
  redisPassword: REDIS_PASSWORD ?? "",
  appPepper: APP_PEPPER,
  nodeEnv: NODE_ENV,
};

export type ConfigModel = typeof config;
