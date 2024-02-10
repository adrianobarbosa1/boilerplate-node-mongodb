import { PrismaGymRepository } from "@/repositories/repository/prisma.gym.repository";
import { GymUseCase } from "../gym.useCase";

export function makeGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository();
  const gymUseCase = new GymUseCase(prismaGymRepository);
  return gymUseCase;
}
