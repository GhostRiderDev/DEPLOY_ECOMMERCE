import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MS-ORDERS",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "consumer-orders",
          },
        },
      },
      {
        name: "MS-USERS",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "CONSUMER-USER",
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
