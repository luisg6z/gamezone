import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { REVIEWS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from 'src/common';

@Controller('reviews')
export class ReviewsController {
  constructor(
      @Inject(REVIEWS_SERVICE) private readonly reviewsClient: ClientProxy,
    ) {}
  
    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
      return this.reviewsClient.send(
        "createReview", createReviewDto
      ).pipe(
        catchError( err => {throw new RpcException(err) })
      );
    }
  
    @Get()
    @ApiQuery({name: "page", required: false, type: Number, description: "Page number"})
    @ApiQuery({name: "limit", required: false, type: Number, description: "Number of items per page"})
    findAll(@Query() paginationDto: PaginationDto) {
      return this.reviewsClient.send(
        "findAllReview", paginationDto
      ).pipe(
        catchError( err => {throw new RpcException(err) })
      );
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.reviewsClient.send(
        "findOneReview", { id }
      ).pipe(
        catchError( err => {throw new RpcException(err) })
      )
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
      console.log({...updateReviewDto, id})
      return this.reviewsClient.send(
        "updateReview", {...updateReviewDto, id}
      ).pipe(
        catchError( err => {throw new RpcException(err) })
      )
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.reviewsClient.send(
        "removeReview", { id }
      ).pipe(
        catchError( err => {throw new RpcException(err) })
      )
    }
}
