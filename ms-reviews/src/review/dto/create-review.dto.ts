import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
import { Ratings } from "src/common/types/ratings"

export class CreateReviewDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    userMail: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    gameId: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    rating: Ratings

}
