import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [GamesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'GAMES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.gamesMsHost,
          port: envs.gamesMsPort
        }
      }
    ])
  ],
})
export class GamesModule {}
