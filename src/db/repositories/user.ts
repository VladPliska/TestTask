import { injectable } from "inversify";
import { Document } from "mongoose";
import { UserProps } from "../../domains/user";
import Repository from "../../interfaces/db/repositories";
import UserModel from "../schemas/user";

@injectable()
export default class UserRepository implements Repository{
  constructor() {}

  async create(data: UserProps): Promise<Document> {
      return (await UserModel.create(data)).save();
  }

  async update(data: UserProps): Promise<any> {
    const {id: _id, password = null, ...info} = data;

    return UserModel.updateOne({_id}, {...info});
  }

  async delete(id: string) {
    return UserModel.findByIdAndRemove(id);
  }

  async findById(id: string): Promise<Document | null> {
    return UserModel.findById(id) ?? null;
  }

  async find(filterOption: UserProps): Promise<Document[]> {
    return UserModel.find(filterOption);
  }
}
