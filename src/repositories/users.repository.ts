import { IUserDoc, IUserInput } from "@/model/user";

export interface UsersRepository {
  create(data: IUserInput): Promise<IUserDoc>;
  findById(id: string): Promise<IUserDoc | null>;
  findByEmail(email: string): Promise<IUserDoc | null>;
}
