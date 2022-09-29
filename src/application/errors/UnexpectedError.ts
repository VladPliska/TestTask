import { BaseError } from "./BaseError";

export class UnexpectedError extends BaseError{
  constructor(err: unknown, message = 'UnexpectedError'){
    super("UnexpectedError", message, err);
  }
}