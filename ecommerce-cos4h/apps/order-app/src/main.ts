import { NestFactory } from "@nestjs/core";
import { OrderAppModule } from "./order-app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";

// groupId: kafkaConfig().services.order.groupId

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderAppModule, {
    transport: Transport.KAFKA,
    options: {
      name: "SERVICIO-ORDEN",
      client: {
        clientId: "CLIENTE-ORDEN",
        brokers: [kafkaConfig().broker],
      },
      consumer: {
        groupId: "GRUPO-ORDEN",
      },
    },
  });
  app.listen();
}
bootstrap();
