import { MongoGymRepository } from "@/repositories/repository/mongo.gym.repository";
import { GymUseCase } from "../gym.useCase";

export function makeGymUseCase() {
  const prismaGymRepository = new MongoGymRepository();
  const gymUseCase = new GymUseCase(prismaGymRepository);
  return gymUseCase;
}
