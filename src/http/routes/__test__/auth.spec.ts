import { app } from "@/app";
import { dbClear, dbConnect, dbDisconnect } from "@/test/setup";
import request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

describe("AUTH e2e", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    await dbClear();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  describe("post /auth/register ", () => {
    it("deve poder criar um usuário, retornando 201", async () => {
      return await request(app.server)
        .post("/auth/register")
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          password: "123456",
        })
        .expect(201);
    });

    it("deve retornar 400 erro se name for vazio", async () => {
      const resp = await request(app.server).post("/auth/register").send({
        name: "",
        email: "johndoe@example.com",
        password: "123456",
      });
      expect(resp.status).toEqual(400);
    });

    it("deve retornar 400 erro se email invalid or vazio", async () => {
      const resp = await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoeexample.com",
        password: "123456",
      });

      const resp2 = await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "",
        password: "123456",
      });
      expect(resp.status).toEqual(400);
      expect(resp2.status).toEqual(400);
    });

    it("deve retornar 400 error se password for vazio or menor que 6", async () => {
      const resp = await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoeexample.com",
        password: "",
      });

      const resp2 = await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoeexample.com",
        password: "12345",
      });
      expect(resp.status).toEqual(400);
      expect(resp2.status).toEqual(400);
    });
  });

  describe("post /auth/login ", () => {
    it("deve poder se autenticar, retornando 200", async () => {
      await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      });

      const resp = await request(app.server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "123456",
      });
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        token: expect.any(String),
      });
    });

    it("deve retornar 400 erro se email and password for vazio", async () => {
      const resp = await request(app.server).post("/auth/login").send({
        email: "",
        password: "123456",
      });

      const resp2 = await request(app.server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "",
      });

      expect(resp.status).toEqual(400);
      expect(resp2.status).toEqual(400);
    });

    it("deve retornar 401 Unauthorized, se não encontrar email do usuário", async () => {
      const resp = await request(app.server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "123456",
      });
      expect(resp.status).toEqual(401);
    });

    it("deve retornar 401 Unauthorized, se password for errado", async () => {
      await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      });

      const resp = await request(app.server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "password_wrong",
      });
      expect(resp.status).toEqual(401);
    });
  });

  describe("post /auth/token/refresh ", () => {
    it("deve ser capaz de atualizar um token", async () => {
      await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      });

      const loginResponse = await request(app.server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "123456",
      });

      const cookies = loginResponse.get("Set-Cookie");

      const response = await request(app.server)
        .post("/auth/token/refresh")
        .set("Cookie", cookies)
        .send();

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        token: expect.any(String),
      });
      expect(response.get("Set-Cookie")).toEqual([
        expect.stringContaining("refreshToken="),
      ]);
    });

    it("deve retornar 401 error se token estiver expirado", async () => {
      await request(app.server).post("/auth/register").send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      });

      vi.setSystemTime(new Date(2023, 0, 1, 13, 40)); //2023 ano, 0 janeiro, 1 dia, 13 hora, 40 minutes
      const loginResponse = await request(app.server).post("/auth/login").send({
        email: "johndoe@example.com",
        password: "123456",
      });

      const cookies = loginResponse.get("Set-Cookie");

      vi.setSystemTime(new Date(2023, 0, 2, 13, 42));
      const response = await request(app.server)
        .post("/auth/token/refresh")
        .set("Cookie", cookies)
        .send();

      expect(response.status).toEqual(401);
    });
  });
});
