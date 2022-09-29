import {inject, injectable} from "inversify";
import IUseCase from "../usecase";
import SignInDTO from "./dto/signIn.dto";
import {UnexpectedError} from "../../errors/UnexpectedError";
import Repository from "../../../interfaces/db/repositories";
import TYPES from "../../../contatiner/Types";
import { NotFoundError } from "../../errors/NotFound";
import {IUserBuilder} from "../../../interfaces/domain/types.entity";
import {AppError} from "../../errors/AppError";
import {BadRequestError} from "../../errors/BadRequset";
import { ITokenService } from "../../../interfaces/utils/tokenService";

@injectable()
export default class SingIn implements IUseCase{
  constructor(
      @inject(TYPES.UserRepository) private userRepository: Repository,
      @inject(TYPES.UserBuilder) private userBuilder: IUserBuilder,
      @inject(TYPES.TokenService) private tokenService: ITokenService,
  ){}

  async execute(data: SignInDTO): Promise<any>  {
    try {
      const existUser = await this.userRepository.find({email: data.email});

      if (!existUser.length)
        return new NotFoundError('User not found');

      const user = this.userBuilder.restore(existUser[0]);

      if(user instanceof AppError){
        return user;
      }

      if(!user.comparePassword(user.password, data.password))
        return new BadRequestError('User verify is failed');

      const tokenPayload = {
        userId: user.id,
        name: user.name,
        email: user.email,
      }

      const token = this.tokenService.makeToken({...tokenPayload, type: 'access'});
      const refreshToken = this.tokenService.makeToken({userId: user.id, type: 'refresh'});
      user.refreshToken = refreshToken;

      await this.userRepository.update(user.toObject());

      return {
        ...tokenPayload,
        token,
        refreshToken,
      }
    }catch (err) {
      return new UnexpectedError(err);
    }

  }
}