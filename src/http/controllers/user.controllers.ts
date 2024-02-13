import { userService } from "@/service/user.service";
import { FastifyReply, FastifyRequest } from "fastify";

async function userMe(req: FastifyRequest, res: FastifyReply) {
  const { user } = await userService.getUserProfile({
    userId: req.user.sub,
  });

  return res.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  });
}

export const userController = {
  userMe,
};
