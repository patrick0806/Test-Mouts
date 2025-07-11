import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class ListUsersRequestDTO {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1, default: 1, required: false })
    page: number = 1;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 10, default: 10, required: false })
    size: number = 10;
}