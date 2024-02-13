import { NotAuthorizedError } from "@/errors/not-authorized-error";
import { compare } from "bcryptjs";
import User from "../model/user";
import { AuthRequest, AuthResponse } from "./auth.types";

const login = async ({
  email,
  password,
}: AuthRequest): Promise<AuthResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError();
  }

  const doesPassMatches = await compare(password, user.passwordHash);
  if (!doesPassMatches) {
    throw new NotAuthorizedError();
  }

  return {
    user,
  };
};

const refreshToken = async ({
  email,
  password,
}: AuthRequest): Promise<AuthResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError();
  }

  const doesPassMatches = await compare(password, user.passwordHash);
  if (!doesPassMatches) {
    throw new NotAuthorizedError();
  }

  return {
    user,
  };
};

export const authService = {
  login,
  refreshToken,
};
