import { NestFactory } from '@nestjs/core';
import { ProductAppModule } from './product-app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductAppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'gateway-consumer-products',
      },
    },
  });

  app.listen();
}

bootstrap();
