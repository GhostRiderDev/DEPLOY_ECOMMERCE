import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { OrderModule } from "./modules/order/order.module";
import { FileModule } from "./modules/file/file.module";
import { JwtModule } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    FileModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h" },
      secret: process.env.SECRET_JWT,
    }),
    MulterModule.register({
      dest: "./uploads",
    }),
    OrderModule,
    UsersModule,
  ],
  controllers: [],
  providers: [Reflector],
})
export class ApiGatewayModule {}
