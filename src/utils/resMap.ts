import { Response } from "express"
import { BadRequestError } from "../application/errors/BadRequset"
import { BaseError } from "../application/errors/BaseError"
import { UnexpectedError } from "../application/errors/UnexpectedError"
import { NotFoundError } from "../application/errors/NotFound"


export const responseHandler = (res: Response, payload: any | BaseError) => {
  
  if(payload instanceof BadRequestError)
    return res.status(400).json({
      name: payload.name,
      message: payload.message,
    })

  if (payload instanceof NotFoundError)
    return res.status(404).json({
      name: payload.name,
      message: payload.message,
    });

  if (payload instanceof UnexpectedError)
    return res.status(500).json({
      name: payload.name,
      message: payload.message,
      });

  return res.status(200).json({data: payload});

}