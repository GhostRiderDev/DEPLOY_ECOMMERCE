import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "../../config/kafka.config";
import { OrderService } from "../order/order.service";
import { OrderModule } from "../order/order.module";
import { AuthController } from "./auth/auth.controller";

// name: kafkaConfig().services.user.name
// clientId: kafkaConfig().services.gateway.clientId
// groupId: kafkaConfig().services.user.groupId
@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, OrderService],
  imports: [
    OrderModule,
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
})
export class UsersModule {}
