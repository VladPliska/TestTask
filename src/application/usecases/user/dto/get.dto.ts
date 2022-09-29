import {IsOptional, IsString} from "class-validator";

export default class GetUsersDTO {
  @IsOptional()
  @IsString()
  name?: string
}