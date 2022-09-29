import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export default class SignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor({password, email}: SignInDTO){
    this.password = password;
    this.email = email;
  }

}