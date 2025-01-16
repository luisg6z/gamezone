import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './schemas/review.schema';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [MongooseModule.forFeature([{
    name: 'Review',
    schema: ReviewSchema
  }])]
})
export class ReviewModule {}
