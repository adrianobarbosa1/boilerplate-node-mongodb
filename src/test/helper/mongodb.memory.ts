import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoDb: MongoMemoryServer;

export const connectMongoInMemory = async () => {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();
  await mongoose.connect(uri, { dbName: "dbtest" });
};

export const disconnectMongoInMemory = async () => {
  await mongoDb.stop();
};

export const dbClear = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
};
