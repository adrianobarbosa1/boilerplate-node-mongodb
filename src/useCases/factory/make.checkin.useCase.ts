import { MongoCheckinRepository } from "@/repositories/repository/mongo.checkin.repository";
import { MongoGymRepository } from "@/repositories/repository/mongo.gym.repository";
import { CheckInUseCase } from "../checkin.useCase";

export function makeCheckinUseCase() {
  const prismaChekinRepository = new MongoCheckinRepository();
  const prismaGymRepository = new MongoGymRepository();
  const checkinUseCase = new CheckInUseCase(
    prismaChekinRepository,
    prismaGymRepository
  );
  return checkinUseCase;
}
