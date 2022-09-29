import {IsEmail, IsOptional, IsString, MaxLength} from "class-validator";


export default class UpdatedUserDTO {
    readonly id: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}