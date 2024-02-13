import User from "@/model/user";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthUser(app: FastifyInstance, isAdmin = false) {
  await User.create({
    name: "John Doe",
    email: "johndoe@example.com",
    passwordHash: await hash("123456", 6),
    role: isAdmin ? "admin" : "user",
  });

  const respLogin = await request(app.server).post("/auth/login").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  const { token } = respLogin.body;
  return {
    token,
  };
}
