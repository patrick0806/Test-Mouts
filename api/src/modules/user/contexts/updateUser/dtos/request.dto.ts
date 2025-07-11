import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserRequestDTO {
    @IsNotEmpty()
    @ApiProperty({ example: 'Jhon Doe' })
    name: string;
}