import { checkinService } from "@/service/checkin.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../../errors/bad-request-error";
import { checkinValidation } from "../validations/checkin.validations";

async function checkinRegister(req: FastifyRequest, res: FastifyReply) {
  const { gymId } = checkinValidation.checkinRegisterParams.parse(req.params);
  const { userLocation } = checkinValidation.checkinRegister.parse(req.body);

  const longitude = userLocation.coordinates[0];
  const latitude = userLocation.coordinates[1];

  try {
    await checkinService.create({
      gymId,
      userId: req.user.sub,
      userLongitude: longitude,
      userLatitude: latitude,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  return res.status(201).send();
}

async function checkinGetAll(req: FastifyRequest, res: FastifyReply) {
  const { page } = checkinValidation.checkinGetAllQuery.parse(req.query);
  const { checkIns } = await checkinUseCase.getAll({
    page,
    userId: req.user.sub,
  });
  return res.status(200).send({ checkIns });
}

async function checkinGetAllChekinsByUserId(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { checkInsCount } = await checkinUseCase.getAllChekinsByUserId({
    userId: req.user.sub,
  });
  return res.status(200).send({ checkInsCount });
}

async function checkinValidate(req: FastifyRequest, res: FastifyReply) {
  const { checkInId } = checkinValidation.checkinValidateParams.parse(
    req.params
  );

  await checkinUseCase.validateCheckin({ checkInId });
  return res.status(204).send();
}

export const checkinController = {
  checkinRegister,
  checkinGetAll,
  checkinGetAllChekinsByUserId,
  checkinValidate,
};
