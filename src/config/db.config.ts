import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";

export const connectDB = async () => {
  try {
    const dbUrl = serverConfig.DB_URL;
    await mongoose.connect(dbUrl);
    logger.info("Connected to mongoDb successfully");

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDb connection closed");
      process.exit(0);
    });
  } catch (error) {
    logger.error("failed to connect to mongoDB", error);
    process.exit(1);
  }
};
