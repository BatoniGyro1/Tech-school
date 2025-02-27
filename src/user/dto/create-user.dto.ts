import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    
}
