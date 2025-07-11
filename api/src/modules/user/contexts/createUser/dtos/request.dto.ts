import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserRequestDTO {
    @IsNotEmpty()
    @ApiProperty({ example: 'Jhon Doe' })
    name: string;

    @IsEmail()
    @ApiProperty({ example: 'jhon.doe@example.com' })
    email: string;

    @MinLength(8)
    @ApiProperty({ example: '123456' })
    password: string;
}