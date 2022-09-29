import { BaseError } from "./BaseError";

export default class UnauthorizedError extends BaseError{
  constructor(message='UnauthorizedError') {
    super('UnauthorizedError', message);
  }
}