import { app } from "@/app";
import { dbClear, dbConnect, dbDisconnect } from "@/test/setup";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, it, vi } from "vitest";
import { createAndAuthUser } from "./create-and-authenticate-user";

describe("USER e2e", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await dbClear();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  describe("get /users/me ", () => {
    it("deve poder mostrar perfil do usuario, retornando 200", async () => {
      const { token } = await createAndAuthUser(app);

      return await request(app.server)
        .get("/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          password: "123456",
        })
        .expect(200);
    });

    it("deve retornar 401 Unauthorized se token passou 10 minutos", async () => {
      vi.setSystemTime(new Date(2023, 0, 1, 13, 40)); //2023 ano, 0 janeiro, 1 dia, 13 hora, 40 minutes
      const { token } = await createAndAuthUser(app);

      vi.setSystemTime(new Date(2023, 0, 1, 14, 40));
      return await request(app.server)
        .get("/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          password: "123456",
        })
        .expect(401);
    });
  });
});
