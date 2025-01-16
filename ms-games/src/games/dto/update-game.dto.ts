import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString } from 'class-validator';
import { Genre } from '@prisma/client';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsNumberString()
  @IsPositive()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  description?: string;
  
  @IsString()
  @IsOptional()
  image?: string;
  
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
  
  @IsString({each: true})
  @IsArray()
  @IsOptional()
  genre?: Genre [];
  
  @IsDateString()
  @IsOptional()
  releaseDate?: Date;
  
}
