import { IUserInput, User } from "@/model/user";

export interface UsersRepository {
  create(data: IUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
