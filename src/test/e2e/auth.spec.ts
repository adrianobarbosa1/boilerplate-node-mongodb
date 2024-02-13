import Request from "supertest";
import {
  connectMongoInMemory,
  dbClear,
  dbDisconnect,
} from "../helper/mongodb.memory";

describe("AUTH e2e", async () => {
  beforeEach(async () => {
    await connectMongoInMemory();
  });

  afterEach(async () => {
    await dbClear();
    await dbDisconnect();
  });

  it("deve poder criar um usuário", async () => {
    const { user } = await Request(app.server).post("/auth/register").send({});

    console.log(user);
    expect(user.status).toEqual(201);
  });
});
