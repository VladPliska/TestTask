import {NextFunction, Request, Response} from 'express';
import {TokenService} from "../../../utils/tokenService";
import {BaseError} from "../../errors/BaseError";

export default function auth() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
      return res.status(401).send({
        message: 'Access Token missing from header'
      })

    const token = authHeader.replace('Bearer ', '');

    if(!token)
      return res.status(401).send({
        message: 'Bearer token not found'
      })

    const tokenService = new TokenService();
    const tokenPayload = tokenService.verifyToken(token);

    if(tokenPayload instanceof BaseError)
      return res.status(401).send({
        message: 'Token is not valid'
      })

    res.locals.user = {
      userId: tokenPayload.userId,
      name: tokenPayload.name,

    }

    next();
  };
}