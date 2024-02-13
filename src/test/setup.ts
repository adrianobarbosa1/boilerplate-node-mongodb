import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

// beforeAll(async () => {
//   await app.ready();
//   mongo = await MongoMemoryServer.create();
//   const mongoUri = mongo.getUri();
//   await mongoose.connect(mongoUri, {});
// });

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   await app.close();
//   if (mongo) {
//     await mongo.stop();
//   }
//   await mongoose.connection.close();
// });

export const dbConnect = async () => {
  await app.ready();
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
};

export const dbClear = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const dbDisconnect = async () => {
  await app.close();
  await mongoose.disconnect();
};
