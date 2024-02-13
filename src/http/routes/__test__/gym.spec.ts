import { app } from "@/app";
import { dbClear, dbConnect, dbDisconnect } from "@/test/setup";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createAndAuthUser } from "./create-and-authenticate-user";

describe("GYM e2e", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await dbClear();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  describe("post /gyms/register ", () => {
    it("deve poder criar gym, retornando 201", async () => {
      const { token } = await createAndAuthUser(app, true);

      const response = await request(app.server)
        .post("/gyms/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Academia Test",
          description: "same description",
          phone: "66-9999-9999",
          location: {
            type: "Point",
            coordinates: [-49.6401091, -27.2092052],
          },
        });
      expect(response.statusCode).toEqual(201);
    });

    it("deve retornar 400 error, se title for vazio", async () => {
      const { token } = await createAndAuthUser(app, true);

      return await request(app.server)
        .post("/gyms/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "",
          description: "same description",
          phone: "66-9999-9999",
          location: {
            type: "Point",
            coordinates: [-49.6401091, -27.2092052],
          },
        })
        .expect(400);
    });

    it("deve retornar 400 error, se location for vazio", async () => {
      const { token } = await createAndAuthUser(app, true);

      return await request(app.server)
        .post("/gyms/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "",
          description: "same description",
          phone: "66-9999-9999",
          location: {},
        })
        .expect(400);
    });

    it("deve retornar 400 error, se location invalid", async () => {
      const { token } = await createAndAuthUser(app, true);

      return await request(app.server)
        .post("/gyms/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "",
          description: "same description",
          phone: "66-9999-9999",
          location: {
            type: "Point",
            coordinates: [-93.2092052, -190.6401091],
          },
        })
        .expect(400);
    });
  });

  describe("get /gyms/search ", () => {
    it("deve poder encontrar gyms pelo title, return 200", async () => {
      const { token } = await createAndAuthUser(app, true);

      await request(app.server)
        .post("/gyms/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "JavaScript Gym",
          description: "Some description.",
          phone: "1199999999",
          location: {
            type: "Point",
            coordinates: [-49.6401091, -27.2092052],
          },
        });

      await request(app.server)
        .post("/gyms/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "TypeScript Gym",
          description: "Some description.",
          phone: "1199999999",
          location: {
            type: "Point",
            coordinates: [-49.5229501, -27.0610928],
          },
        });

      const response = await request(app.server)
        .get("/gyms/search")
        .query({
          filter: "JavaScript",
        })
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(response.statusCode).toEqual(200);
      expect(response.body.gyms.docs).toHaveLength(1);
      expect(response.body.gyms.docs).toEqual([
        expect.objectContaining({
          title: "JavaScript Gym",
        }),
      ]);
    });
  });
});
