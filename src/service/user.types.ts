import { User } from "../model/user";

//---------------CREATE USER------------------------
export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserCreateResponse {
  user: User;
}

//---------------GETUSERPROFILE USER------------------------
export interface UserGetProfileRequest {
  userId: string;
}
export interface UserGetProfileResponse {
  user: User;
}

//---------------findUserByEmail USER------------------------
export interface UserFindUserByEmaileRequest {
  email: string;
}
export interface UserFindUserByEmaileResponse {
  user: User;
}
