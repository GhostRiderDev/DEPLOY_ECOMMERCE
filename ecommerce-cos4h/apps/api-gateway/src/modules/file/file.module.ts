import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    ClientsModule.register([
      {
        name: "MS-FILES",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "CONSUMER-FILE",
          },
        },
      },
      {
        name: "MS-PRODUCTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "CONSUMER-PRODUCT",
          },
        },
      },
      {
        name: "MS-ORDERS",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "CONSUMER-ORDER",
          },
        },
      },
    ]),
  ],
})
export class FileModule {}
