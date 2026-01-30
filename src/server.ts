import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { connectRedis } from "./config/redis";
import { config } from "./config/index";

const app = express();

// Always bring protection with you
app.use(helmet());

// Log requests in development mode
if (config.nodeEnv === "development") {
  app.use(morgan("tiny"));
}

app.use(express.json());

// Limit route access to prevent attacks
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

import authRoutes from "./routes/auth";
app.use("/api", authLimiter, authRoutes);

(async () => {
  await connectRedis();
  app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
  });
})();
