import { UsersRepository } from "@/repositories/users.repository";
import { NotAuthorizedError } from "@/useCases/errors/not-authorized-error";
import { compare } from "bcryptjs";
import {
  AuthenticateUseCaseRequest,
  AuthenticateUseCaseResponse,
} from "./authenticate.types";

export class AuthenticateUseCase {
  constructor(private authRepository: UsersRepository) {}

  async login({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new NotAuthorizedError();

    const doesPassMatches = await compare(password, user.passwordHash);
    if (!doesPassMatches) throw new NotAuthorizedError();

    return {
      user,
    };
  }
}
