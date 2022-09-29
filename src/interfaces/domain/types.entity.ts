import {User, UserProps} from "../../domains/user";
import {AppError} from "../../application/errors/AppError";

// Create for create new User
// restore for get object from store and transform to User

export interface IUserBuilder {
    create(user: UserProps): User | AppError;
    restore(user: UserProps): User | AppError;
}