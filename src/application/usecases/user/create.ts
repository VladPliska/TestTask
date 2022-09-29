import { inject, injectable } from "inversify";
import TYPES from "../../../contatiner/Types";
import {UserBuilder, UserProps} from "../../../domains/user";
import Repository from "../../../interfaces/db/repositories";
import { AppError } from "../../errors/AppError";
import { BadRequestError } from "../../errors/BadRequset";
import { UnexpectedError } from "../../errors/UnexpectedError";
import IUseCase from "../usecase";
import CreateDto from "./dto/create.dto";
import {BaseError} from "../../errors/BaseError";

@injectable()
export default class Create implements IUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: Repository,
    @inject(TYPES.UserBuilder)
    private userBuilder: UserBuilder
    ) {}

  async execute(data: CreateDto): Promise<UserProps | BaseError> {
    try{
      const existUser = await this.userRepository.find({email: data.email});
      
      if(existUser.length)
        return new BadRequestError('User exist');

      const user = this.userBuilder.create(data);

      if(user instanceof AppError)
        return new BadRequestError(user.message);

      user.password = data.password;
      const savedObject = user.toObject();
      await this.userRepository.create({_id: savedObject.id, ...savedObject});

      return savedObject;
    }catch(err){
      return new UnexpectedError(err);
    }
   
  };
}