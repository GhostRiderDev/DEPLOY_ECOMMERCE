import { NestFactory } from "@nestjs/core";
import { UserAppModule } from "./user-app.module";
import { Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";

// groupId: kafkaConfig().services.user.groupId

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserAppModule, {
    transport: Transport.KAFKA,
    options: {
      name: "SERVICIO-USUARIO",
      client: {
        clientId: "CLIENTE-USUARIO",
        brokers: [kafkaConfig().broker],
      },
      consumer: {
        groupId: "GRUPO-USUARIO",
      },
    },
  });
  app.listen();
}

bootstrap();
