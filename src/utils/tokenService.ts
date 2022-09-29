import JWT, {JwtPayload} from 'jsonwebtoken';
import {BadRequestError} from '../application/errors/BadRequset';
import {ITokenService} from "../interfaces/utils/tokenService";
import {injectable} from "inversify";
import {BaseError} from "../application/errors/BaseError";

@injectable()
export class TokenService implements ITokenService {
  private readonly SECRET = process.env.TOKEN_SECRET as string;

  makeToken(payload: any): string {
    return JWT.sign(payload, this.SECRET, {
      expiresIn: payload.type === 'access' ? process.env.ACCESS_TOKEN_EXP : process.env.REFRESH_TOKEN_EXT
    })
  }

  verifyToken(token: string): JwtPayload | BaseError {
    try {
      return JWT.verify(token, this.SECRET) as JwtPayload;
    } catch (err: any) {
      return new BadRequestError(`TokenError: ${err.message}`);
    }
  }

  decode(token: string): JwtPayload | string | null | BaseError {
    try {
      return JWT.decode(token);
    } catch (err) {
      return new BadRequestError('Token is not valid');
    }
  }
}