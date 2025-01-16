import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @MessagePattern('createGame')
  create(@Payload() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @MessagePattern('findAllGames')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.gamesService.findAll(paginationDto);
  }

  @MessagePattern('findOneGame')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.gamesService.findOne(id);
  }

  @MessagePattern('updateGame')
  update(@Payload() updateGameDto: UpdateGameDto) {
    console.log(updateGameDto);
    return this.gamesService.update(+updateGameDto.id, updateGameDto);
  }

  @MessagePattern('removeGame')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.gamesService.remove(id);
  }
}
