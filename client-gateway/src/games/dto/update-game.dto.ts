import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Genre } from 'src/common';

export class UpdateGameDto extends PartialType(CreateGameDto) {
    @ApiProperty({type: String})
    @IsString()
    @IsOptional()
    title?: string;
    
    @ApiProperty({type: String})
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({type: String})
    @IsString()
    @IsOptional()
    image?: string;
    
    @ApiProperty({type: Number})
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;
    
    @ApiProperty({enum: Genre, enumName: "Games-genre", isArray: true})
    @IsOptional()
    @IsString({each: true})
    @IsArray()
    genre?: Genre [];
    
    @ApiProperty({type: Date})
    @IsOptional()
    @IsDateString()
    releaseDate?: Date;
}
