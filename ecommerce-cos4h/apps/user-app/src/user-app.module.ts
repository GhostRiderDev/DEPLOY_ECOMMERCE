import { Module } from '@nestjs/common';
import { UserAppController } from './user-app.controller';
import { UserAppService } from './user-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dataSourceConfig from './config/data-source';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('data-source'),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: 'MS-ORDERS',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'CONSUMER-ORDER',
          },
        },
      },
    ]),
  ],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
