import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from './review/review.module';
import { envs } from './config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), MongooseModule.forRoot(envs.dbUri), ReviewModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
