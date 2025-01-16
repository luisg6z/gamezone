import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [ReviewsController],
  providers: [],
  imports: [
    ClientsModule.register([
          {
            name: 'REVIEWS_SERVICE',
            transport: Transport.TCP,
            options: {
              host: envs.reviewsMsHost,
              port: envs.reviewsMsPort,
            }
          }
        ])
  ]
})
export class ReviewsModule {}
