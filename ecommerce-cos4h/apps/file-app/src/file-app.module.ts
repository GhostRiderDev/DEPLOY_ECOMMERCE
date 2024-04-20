import { Module } from "@nestjs/common";
import { FileAppController } from "./file-app.controller";
import { FileAppService } from "./file-app.service";
import { cloudinaryConfig } from "./config/cloudinary.config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: kafkaConfig().services.product.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig().services.file.clientId,
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: kafkaConfig().services.product.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [FileAppController],
  providers: [FileAppService, cloudinaryConfig],
})
export class FileAppModule {}
