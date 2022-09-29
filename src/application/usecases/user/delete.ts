import IUseCase from "../usecase";
import {inject, injectable} from "inversify";
import TYPES from "../../../contatiner/Types";
import Repository from "../../../interfaces/db/repositories";
import {UnexpectedError} from "../../errors/UnexpectedError";

@injectable()
export default class DeleteUser implements IUseCase {
  constructor(
      @inject(TYPES.UserRepository) private userRepository: Repository
  ) {
  }

  execute(id: string) {
    try {
      return this.userRepository.delete(id);
    } catch (err) {
      return new UnexpectedError(err);
    }
  }
}