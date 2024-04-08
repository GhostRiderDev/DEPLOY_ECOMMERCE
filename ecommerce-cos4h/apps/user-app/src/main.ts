import { NestFactory } from '@nestjs/core';
import { UserAppModule } from './user-app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserAppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'gateway-consumer-users',
      },
    },
  });
  app.listen();
}

bootstrap();
