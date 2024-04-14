import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ClientsModule.register([
      {
        name: 'API-GATEWAY-USERS',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'CONSUMER-USER',
          },
        },
      },
    ]),
  ],
})
export class UsersModule {}
