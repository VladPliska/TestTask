import {BaseError} from "./BaseError";

export class AppError extends BaseError {
    constructor(message = 'Something is going wrong'){
        super('AppError', message);
    }
}