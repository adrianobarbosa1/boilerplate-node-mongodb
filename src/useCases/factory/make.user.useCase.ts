import { MongoUsersRepository } from "@/repositories/repository/mongo.users.repository";
import { UserUseCase } from "../user.useCase";

export function makeUserUsercase() {
  const usersPrismaRepository = new MongoUsersRepository();
  const userUseCase = new UserUseCase(usersPrismaRepository);
  return userUseCase;
}
