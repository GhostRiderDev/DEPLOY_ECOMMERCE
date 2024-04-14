import { NestFactory } from '@nestjs/core';
import { OrderAppModule } from './order-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        subscribe: {
          fromBeginning: true,
        },
        client: {
          brokers: ['localhost:9092'],
        },
      },
    },
  );
  app.listen();
}
bootstrap();
