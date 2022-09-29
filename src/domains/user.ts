import { IPasswordService } from '../interfaces/utils/password';
import { IUserBuilder } from '../interfaces/domain/types.entity';
import { inject, injectable } from 'inversify';
import { UserEntity } from '../interfaces/domain/user';
import { validateNullOrString, validateString } from '../utils/heplers';
import { AppError } from '../application/errors/AppError';
import TYPES from '../contatiner/Types';
import { IIdService } from '../interfaces/utils/idService';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: string | null;
}

@injectable()
export class UserBuilder implements IUserBuilder {
  @inject(TYPES.PasswordService) private pwdService: IPasswordService;
  @inject(TYPES.IdService) private idService: IIdService;

  create(data: Omit<UserProps, 'id'>): User | AppError {
    const { name, email, password, refreshToken = null } = data;

    if (!validateString(name)) {
      return new AppError('Name must be a valid string');
    }

    if (!validateString(email)) {
      return new AppError('Email must be a valid string');
    }

    if (!validateString(password)) {
      return new AppError('password must be a valid string');
    }

    const id = this.idService.generateId();
    const passwordHash = this.pwdService.hashPassword(password);

    return new User(
      { id, name, password: passwordHash, email, refreshToken },
      this.pwdService
    );
  }

  restore(data: UserProps): User | AppError {
    const { id, name, email, password, refreshToken = null }: UserProps = data;

    if (!validateNullOrString(name))
      return new AppError('Name must be a valid string');

    // regular expression for email
    if (!validateNullOrString(email))
      return new AppError('Email must be a valid string');

    if (!validateNullOrString(password))
      return new AppError('Password must be a valid string');

    if (!this.idService.isValid(id)) {
      return new AppError('Id is not valid');
    }

    return new User({ id, name, email, password, refreshToken }, this.pwdService);
  }
}

export class User implements UserEntity {
  private _passwordService: IPasswordService;

  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _refreshToken: string | null;

  constructor(
    { id, name, email, password, refreshToken = null }: UserProps,
    pwdService: IPasswordService
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._passwordService = pwdService;
    this._refreshToken = refreshToken;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = this._passwordService.hashPassword(value);
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;
  }

  comparePassword(hash: string, pwd: string): boolean {
    return this._passwordService.comparePassword(hash, pwd);
  }

  setFromObject(obj: Partial<UserProps>) {
    if (obj.name) this.name = obj.name;
    if (obj.email) this.email = obj.email;
  }

  toObject(): UserProps {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken
    };
  }
}
