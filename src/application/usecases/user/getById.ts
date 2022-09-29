import {inject, injectable} from "inversify";
import IUseCase from "../usecase";
import Repository from "../../../interfaces/db/repositories";
import TYPES from "../../../contatiner/Types";
import {UserProps} from "../../../domains/user";
import { UnexpectedError } from "../../errors/UnexpectedError";
import {NotFoundError} from "../../errors/NotFound";
import {IUserBuilder} from "../../../interfaces/domain/types.entity";
import {AppError} from "../../errors/AppError";
import {BaseError} from "../../errors/BaseError";

@injectable()
export default class GetUserById implements IUseCase{
  constructor(
      @inject(TYPES.UserRepository) private userRepository: Repository,
      @inject(TYPES.UserBuilder) private userBuilder: IUserBuilder
  ) {}

  async execute(id: string): Promise<UserProps | BaseError> {
    try {
      const userQueryRes = await this.userRepository.findById(id);

      if (!userQueryRes)
        return new NotFoundError('User not found');

      const user = this.userBuilder.restore(userQueryRes);

      if(user instanceof AppError)
        return user;

      return user.toObject();
    }catch(err){
      return new UnexpectedError(err);
    }
  }
}