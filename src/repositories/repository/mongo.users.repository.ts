import User, { IUserInput } from "@/model/user";
import { UsersRepository } from "../users.repository";

export class MongoUsersRepository implements UsersRepository {
  async create(data: IUserInput) {
    const user = await User.create(data);
    return user;
  }

  async findById(id: string) {
    const user = await User.findById(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
}
