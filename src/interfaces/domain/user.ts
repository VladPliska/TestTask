import {UserProps} from "../../domains/user";

export interface UserEntity {
   get id(): string;
   get name(): string;
   get email(): string;
   get refreshToken(): string | null;
   set name(name: string);
   set email(email: string);
   set password(password: string);
   set refreshToken(refreshToken: string | null);
   comparePassword(hash: string, pwd: string): boolean
   toObject(): UserProps
   setFromObject(obj: Partial<UserProps>): void
}