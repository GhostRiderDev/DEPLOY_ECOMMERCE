import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "../../config/kafka.config";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";

// name: kafkaConfig().services.order.name
// clientId: kafkaConfig().services.gateway.clientId
// groupId: kafkaConfig().services.order.groupId
@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICIO-USUARIO",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "CLIENTE-USUARIO",
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: "GRUPO-USUARIO",
          },
        },
      },
      {
        name: "SERVICIO-ORDEN",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "CLIENTE-ORDEN",
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: "GRUPO-ORDEN",
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
