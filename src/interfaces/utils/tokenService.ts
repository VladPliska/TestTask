import {JwtPayload} from "jsonwebtoken";
import {BaseError} from "../../application/errors/BaseError";

export interface ITokenService {
  makeToken(payload: object): string
  verifyToken(token: string): JwtPayload | BaseError
  decode(token: string): JwtPayload | string | null | BaseError
}