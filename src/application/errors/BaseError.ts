import { IBaseError } from "../../interfaces/application/errors/BaseError";

export class BaseError implements IBaseError{
  constructor(
    public readonly name: string,
    public readonly message: string,
    public readonly err?: unknown
  ){}
}