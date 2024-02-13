import { BadRequestError } from "@/errors/bad-request-error";
import { gymService } from "@/service/gym.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { gymValidation } from "../validations/gym.validations";

async function gymRegister(req: FastifyRequest, res: FastifyReply) {
  const { title, description, phone, location } =
    gymValidation.gymRegister.parse(req.body);

  try {
    const gym = await gymService.create({
      title,
      description,
      phone,
      location,
    });

    return res.status(201).send({ gym });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

async function gymSearch(req: FastifyRequest, res: FastifyReply) {
  const { filter, page } = gymValidation.gymSearch.parse(req.query);
  const { gyms } = await gymService.getAllGyms({ filter, page });
  return res.status(200).send({ gyms });
}

async function gymNearby(req: FastifyRequest, res: FastifyReply) {
  const { location } = gymValidation.gymNearby.parse(req.body);
  const { gyms } = await gymService.findNearbGyms({
    location,
  });
  return res.status(200).send({ gyms });
}

export const gymController = {
  gymRegister,
  gymSearch,
  gymNearby,
};
