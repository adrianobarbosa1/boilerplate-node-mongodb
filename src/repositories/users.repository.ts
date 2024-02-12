import { IUser, IUserDoc } from "@/model/user";

export interface UsersRepository {
  create(data: IUser): Promise<IUserDoc>;
  findById(id: string): Promise<IUserDoc | null>;
  findByEmail(email: string): Promise<IUserDoc | null>;
}
