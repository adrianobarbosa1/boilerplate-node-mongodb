import { PrismaUsersRepository } from "@/repositories/repository/prisma.users.repository";
import { UserUseCase } from "../user.useCase";

export function makeUserUsercase() {
  const usersPrismaRepository = new PrismaUsersRepository();
  const userUseCase = new UserUseCase(usersPrismaRepository);
  return userUseCase;
}
