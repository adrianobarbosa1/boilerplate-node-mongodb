import { User } from "../model/user";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}
