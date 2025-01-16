import { Genre } from "@prisma/client";
import { IsArray, IsDateString, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsNumber()
    rating: number

    @IsString({each: true})
    @IsArray()
    @IsNotEmpty()
    genre: Genre [];

    @IsNotEmpty()
    @IsDateString()
    releaseDate: Date;
}
