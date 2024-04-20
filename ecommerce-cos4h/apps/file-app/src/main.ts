import { NestFactory } from "@nestjs/core";
import { FileAppModule } from "./file-app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: kafkaConfig().services.file.clientId,
          brokers: [kafkaConfig().broker],
        },
        consumer: {
          groupId: kafkaConfig().services.file.groupId,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
