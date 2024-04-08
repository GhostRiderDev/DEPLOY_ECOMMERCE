import { Module } from '@nestjs/common';
import { UserAppController } from './user-app.controller';
import { UserAppService } from './user-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SID,
  DB_USER,
} from './config/envs';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      sid: DB_SID,
      entities: [UserEntity],
      synchronize: true,
      logging: ['error'],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {
  constructor(private dataSource: DataSource) {}
}
