import { Container } from 'inversify';
import TYPES from './Types';

import IUseCase from '../application/usecases/usecase';
import CreateUser from '../application/usecases/user/create';

import DB from '../db';
import IDB from '../interfaces/db';
import Repository from '../interfaces/db/repositories';
import UserRepository from '../db/repositories/user';
import {UserBuilder} from '../domains/user';
import {IPasswordService} from "../interfaces/utils/password";
import {PasswordService} from "../utils/password";
import {IdService} from "../utils/idService";
import {IIdService} from "../interfaces/utils/idService";
import { IUserBuilder } from '../interfaces/domain/types.entity';
import UpdateUser from "../application/usecases/user/update";
import DeleteUser from "../application/usecases/user/delete";
import GetUsers from "../application/usecases/user/getUsers";
import GetUserById from "../application/usecases/user/getById";
import { TokenService } from '../utils/tokenService';
import {ITokenService} from "../interfaces/utils/tokenService";
import SingIn from "../application/usecases/user/signIn";
import RefreshToken from "../application/usecases/user/refreshToken";

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

container.bind<IDB>(TYPES.DB).to(DB);
container.bind<Repository>(TYPES.UserRepository).to(UserRepository);

//Usecases
container.bind<IUseCase>(TYPES.Create).to(CreateUser);
container.bind<IUseCase>(TYPES.UpdateUser).to(UpdateUser);
container.bind<IUseCase>(TYPES.DeleteUser).to(DeleteUser);
container.bind<IUseCase>(TYPES.GetUsers).to(GetUsers);
container.bind<IUseCase>(TYPES.GetUserById).to(GetUserById);
container.bind<IUseCase>(TYPES.SignIn).to(SingIn);
container.bind<IUseCase>(TYPES.RefreshToken).to(RefreshToken);


//Domain
container.bind<IUserBuilder>(TYPES.UserBuilder).to(UserBuilder);


// Utils
container.bind<IPasswordService>(TYPES.PasswordService).to(PasswordService)
container.bind<IIdService>(TYPES.IdService).to(IdService);
container.bind<ITokenService>(TYPES.TokenService).to(TokenService);

export default container;