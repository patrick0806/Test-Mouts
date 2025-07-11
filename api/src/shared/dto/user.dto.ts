import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UserDTO {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Jhon Doe' })
    name: string;

    @ApiProperty({ example: 'jhon.doe@example.com' })
    email: string;

    @Exclude()
    password?: string;
}