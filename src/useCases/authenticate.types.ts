import { UserDoc } from "@/model/user";

export interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export interface AuthenticateUseCaseResponse {
  user: UserDoc;
}
