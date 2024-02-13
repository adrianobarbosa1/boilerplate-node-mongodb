import mongoose from "mongoose";
import { app } from "./app";
import { env } from "./config";
import { DatabaseConnectionError } from "./errors/database-connection-error";
import { startLoadingEffect, stopLoadingEffect } from "./utils/loadingEffect";

const mongoUri =
  process.env.NODE_ENV === "dev"
    ? process.env.DATABASE_LOCAL
    : process.env.DATABASE_URL;

const start = async () => {
  let loadingInterval: NodeJS.Timeout | null = null;

  try {
    loadingInterval = startLoadingEffect();
    await mongoose.connect(mongoUri!);
    stopLoadingEffect(loadingInterval);
    console.log("Connected to database ✅");

    await app
      .listen({
        host: "0.0.0.0",
        port: env.PORT,
      })
      .then(() => {
        console.log(`Listening on port  http://localhost:${env.PORT} ✅`);
      });
  } catch (err) {
    if (loadingInterval !== null) stopLoadingEffect(loadingInterval);
    console.error(err);
    throw new DatabaseConnectionError();
  }
};

start();
