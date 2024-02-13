import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth";

export async function userRoute(app: FastifyInstance) {
  app.addHook("onRequest", auth);
  app.get("/me", userController.userMe);
}
