import { Module } from "@nestjs/common";
import { FileAppController } from "./file-app.controller";
import { FileAppService } from "./file-app.service";
import { cloudinaryConfig } from "./config/cloudinary.config";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MS-PRODUCTS",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:902"],
          },
        },
      },
    ]),
  ],
  controllers: [FileAppController],
  providers: [FileAppService, cloudinaryConfig],
})
export class FileAppModule {}
