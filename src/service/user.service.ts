import User from "@/model/user";
import { hash } from "bcryptjs";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import {
  UserCreateRequest,
  UserCreateResponse,
  UserGetProfileRequest,
  UserGetProfileResponse,
} from "./user.types";

const create = async ({
  name,
  email,
  password,
}: UserCreateRequest): Promise<UserCreateResponse> => {
  const passwordHash = await hash(password, 6);

  const userExist = await User.findOne({ email });
  if (userExist) throw new BadRequestError("Email already exists");

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return { user };
};

const getUserProfile = async ({
  userId,
}: UserGetProfileRequest): Promise<UserGetProfileResponse> => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError();

  return {
    user,
  };
};

export const userService = {
  create,
  getUserProfile,
};
