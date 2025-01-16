import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { number, string } from "joi";
import { Ratings } from "src/common/constants/rating";

export class CreateReviewDto {
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    userMail: string

    @ApiProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    gameId: number

    @ApiProperty({enum: Ratings, enumName: "Ratings-enum"})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    rating: Ratings
}
