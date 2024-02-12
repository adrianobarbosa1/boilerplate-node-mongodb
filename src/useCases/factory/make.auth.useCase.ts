import { MongoUsersRepository } from "@/repositories/repository/mongo.users.repository";
import { AuthenticateUseCase } from "../authenticate.useCase";

export function makeAuthUsercase() {
  const usersPrismaRepository = new MongoUsersRepository();
  const authUseCase = new AuthenticateUseCase(usersPrismaRepository);
  return authUseCase;
}
