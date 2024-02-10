import { PrismaCheckinRepository } from "@/repositories/repository/prisma.checkin.repository";
import { PrismaGymRepository } from "@/repositories/repository/prisma.gym.repository";
import { CheckInUseCase } from "../checkin.useCase";

export function makeCheckinUseCase() {
  const prismaChekinRepository = new PrismaCheckinRepository();
  const prismaGymRepository = new PrismaGymRepository();
  const checkinUseCase = new CheckInUseCase(
    prismaChekinRepository,
    prismaGymRepository
  );
  return checkinUseCase;
}
