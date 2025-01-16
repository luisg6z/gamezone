import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GamesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('GamesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async create(createGameDto: CreateGameDto) {
    try {
      const game = await this.games.create({
        data: createGameDto
      })
      this.logger.log(`Game created with id ${game.id}`);
      return game;
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "The genre does not exist",
      });
      
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const totalPages = await this.games.count();
    const lastPage = Math.ceil(totalPages / limit);

    this.logger.log(`Finding all games. Page ${page} of ${lastPage}`);
    return {
      data: await this.games.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {isAvailable: true}
      }),
      meta: {
        total: totalPages,
        page,
        lastPage,
      }
    };
  }

  async findOne(id: number) {

    this.logger.log(`Finding game with id ${id}`);
    const game = await this.games.findUnique({
      where: {
        id,
        isAvailable: true
      },
    })

    if (!game) {
      this.logger.error(`Game with id ${id} not found`);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Game with id ${id} not found`
      });
    }

    this.logger.log(`Game with id ${id} found`);

    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    
    const { id: _, ...data } = updateGameDto;

      return await this.games.update({
        where: { id },
        data: data
      });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.games.update({
      where: { id },
      data: { isAvailable: false }
    });
  }
}
