import IUseCase from "../usecase";
import {inject, injectable} from "inversify";
import TYPES from "../../../contatiner/Types";
import Repository from "../../../interfaces/db/repositories";
import UpdatedUserDTO from "./dto/update.dto";
import {UserBuilder, UserProps} from "../../../domains/user";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { NotFoundError } from "../../errors/NotFound";
import {AppError} from "../../errors/AppError";
import {BaseError} from "../../errors/BaseError";

@injectable()
export default class UpdateUser implements IUseCase{
    constructor(
        @inject(TYPES.UserRepository) private userRepository: Repository,
        @inject(TYPES.UserBuilder) private userBuilder: UserBuilder
        ) {
    }

    async execute(data: UpdatedUserDTO): Promise<UserProps | BaseError>{
        try{
            const existUser = await this.userRepository.findById(data.id);

            if(!existUser)
                return new NotFoundError('User not found');

            const user = this.userBuilder.restore(existUser);

            if(user instanceof AppError)
                return user;

            const {id, ...updatedObject} = data;

            user.setFromObject(updatedObject);

            await this.userRepository.update(user.toObject());

            return user.toObject();
        }catch (err){
            return new UnexpectedError(err);
        }
    }
}