import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GAMES_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { ApiQuery } from '@nestjs/swagger';

@Controller('games')
export class GamesController {
  constructor(
    @Inject(GAMES_SERVICE) private readonly gamesClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesClient.send(
      "createGame", createGameDto
    ).pipe(
      catchError( err => {throw new RpcException(err) })
    );
  }

  @Get()
  @ApiQuery({name: "page", required: false, type: Number, description: "Page number"})
  @ApiQuery({name: "limit", required: false, type: Number, description: "Number of items per page"})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.gamesClient.send(
      "findAllGames", paginationDto
    ).pipe(
      catchError( err => {throw new RpcException(err) })
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesClient.send(
      "findOneGame", { id }
    ).pipe(
      catchError( err => {throw new RpcException(err) })
    )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    console.log({...updateGameDto, id})
    return this.gamesClient.send(
      "updateGame", {...updateGameDto, id}
    ).pipe(
      catchError( err => {throw new RpcException(err) })
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesClient.send(
      "removeGame", { id }
    ).pipe(
      catchError( err => {throw new RpcException(err) })
    )
  }
}
