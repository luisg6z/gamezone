import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Review } from './entities/review.entity';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReviewService {

  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: mongoose.Model<Review>
  ) {}

  private readonly logger = new Logger("ReviewsService")

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewModel.create(createReviewDto);
  
      this.logger.log("A review has been created")
  
      return review
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message
      })
    }
  }

  async findAll(paginationDto: PaginationDto){
    const { limit, page } = paginationDto;

    const offset = (page - 1) * limit;

    const reviews = await this.reviewModel.find()
    .limit(limit)
    .skip(offset)
    .where({isAvailable: true});

    return {
      data: reviews,
      meta : {
        page,
        limit
      }
    };
  }

  async findOne(id: string) {
    const review = await this.reviewModel.findById(id)

    if(!review) {
      this.logger.error(`Couldn't found review with the id ${id}`)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Review with the id ${id} not found`
      })
    }
    this.logger.log("GET on find One: code 200")
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewModel.findByIdAndUpdate(id , updateReviewDto, {
      runValidators: true,
      new: true,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return await this.reviewModel.findByIdAndUpdate(id, {isAvailable: false}, {
      runValidators: true,
      new: true,
    })
  }
}
