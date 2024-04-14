import { NestFactory } from '@nestjs/core';
import { FileAppModule } from './file-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'CONSUMER-FILE',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
