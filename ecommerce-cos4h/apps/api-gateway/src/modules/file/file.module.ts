import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "../../config/kafka.config";

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    ClientsModule.register([
      {
        name: kafkaConfig().services.file.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig().services.gateway.clientId,
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: kafkaConfig().services.file.groupId,
          },
        },
      },
      {
        name: kafkaConfig().services.product.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig().services.gateway.clientId,
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: kafkaConfig().services.product.groupId,
          },
        },
      },
      {
        name: kafkaConfig().services.order.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig().services.gateway.clientId,
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: kafkaConfig().services.order.groupId,
          },
        },
      },
    ]),
  ],
})
export class FileModule {}
