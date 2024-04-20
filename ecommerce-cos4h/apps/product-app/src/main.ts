import { NestFactory } from "@nestjs/core";
import { ProductAppModule } from "./product-app.module";
import { Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductAppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaConfig().services.product.clientId,
        brokers: [kafkaConfig().broker],
      },
      consumer: {
        groupId: kafkaConfig().services.product.groupId,
      },
    },
  });
  app.listen();
}

bootstrap();
