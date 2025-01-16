import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
