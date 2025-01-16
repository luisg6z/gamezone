import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { number } from "joi";
import { Genre } from "src/common";

export class CreateGameDto {
    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({type: Number})
    @IsOptional()
    @IsNumber()
    @IsPositive()
    rating: number;

    @ApiProperty({enum: Genre, enumName: "Games-genre", isArray: true})
    @IsNotEmpty()
    @IsString({each: true})
    @IsArray()
    genre: Genre [];

    @ApiProperty({type: Date})
    @IsNotEmpty()
    @IsDateString()
    releaseDate: Date;
}