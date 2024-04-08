import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'API-GATEWAY-PRODUCTS',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'gateway-consumer-products',
          },
        },
      },
      {
        name: 'API-GATEWAY',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'gateway-consumer-orders',
          },
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
