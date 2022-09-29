import { IsString, IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export default class CreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor({password, name, email}: CreateDto){
    this.name = name;
    this.password = password;
    this.email = email;
  }
}