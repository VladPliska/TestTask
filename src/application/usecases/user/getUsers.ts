import {inject, injectable} from "inversify";
import IUseCase from "../usecase";
import TYPES from "../../../contatiner/Types";
import Repository from "../../../interfaces/db/repositories";
import {UserProps} from "../../../domains/user";
import GetUsersDTO from "./dto/get.dto";
import {UnexpectedError} from "../../errors/UnexpectedError";
import {IUserBuilder} from "../../../interfaces/domain/types.entity";
import { AppError } from "../../errors/AppError";
import { BadRequestError } from "../../errors/BadRequset";
import {BaseError} from "../../errors/BaseError";

@injectable()
export default class GetUsers implements IUseCase {
  constructor(
      @inject(TYPES.UserRepository) private userRepository: Repository,
      @inject(TYPES.UserBuilder) private userBuilder: IUserBuilder
  ) {
  }

  async execute(filterOptions: GetUsersDTO): Promise<UserProps[] | BaseError> {
    try {
      const users = await this.userRepository.find(filterOptions);

      return users.map(u => {
        const user = this.userBuilder.restore(u);

        if(user instanceof AppError)
          throw user;

        return user.toObject();
      })
    } catch (err) {
      return new UnexpectedError(err);
    }
  }
}