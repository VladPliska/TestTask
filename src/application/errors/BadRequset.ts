import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError{
  constructor(message = 'BadRequestError'){
    super('BadRequest',message);
  }
}