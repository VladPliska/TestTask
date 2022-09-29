import {inject, injectable} from "inversify";
import IUseCase from "../usecase";
import {ITokenService} from "../../../interfaces/utils/tokenService";
import TYPES from "../../../contatiner/Types";
import { IUserBuilder } from "../../../interfaces/domain/types.entity";
import Repository from "../../../interfaces/db/repositories";
import {UnexpectedError} from "../../errors/UnexpectedError";
import { BadRequestError } from "../../errors/BadRequset";
import { NotFoundError } from "../../errors/NotFound";
import {AppError} from "../../errors/AppError";
import { RefreshTokenResponse } from "../../../interfaces/types";
import {BaseError} from "../../errors/BaseError";

@injectable()
export default class RefreshToken implements IUseCase{
  constructor(
      @inject(TYPES.TokenService) private tokenService: ITokenService,
      @inject(TYPES.UserRepository) private userRepository: Repository,
      @inject(TYPES.UserBuilder) private userBuilder: IUserBuilder,
  ) {}

  async execute(token: string): Promise<RefreshTokenResponse | BaseError> {
    try {
      const processToken = this.tokenService.verifyToken(token);

      //TODO: check in future
      if(processToken instanceof BadRequestError || processToken instanceof BaseError)
        return processToken;

      const processUser = await this.userRepository.find({refreshToken: token});

      if(!processUser.length)
        return new NotFoundError('User not found');

      const user = this.userBuilder.restore(processUser[0]);

      if(user instanceof AppError)
        return user;

      const accessTokenPayload = {
        userId: user.id,
        name: user.name,
        email: user.email,
      }

      const accessToken = this.tokenService.makeToken({type: 'access', ...accessTokenPayload});
      const refreshToken = this.tokenService.makeToken({type: 'refresh', userId: user.id});

      user.refreshToken = refreshToken;

      await this.userRepository.update(user.toObject());

      return {
        accessToken,
        refreshToken,
      }
    }catch (err){
      return new UnexpectedError(err);
    }
  }
}