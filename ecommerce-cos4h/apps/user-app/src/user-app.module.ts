import { Module } from "@nestjs/common";
import { UserAppController } from "./user-app.controller";
import { UserAppService } from "./user-app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import dataSourceConfig from "./config/data-source";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "./config/kafka.config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("data-source"),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: kafkaConfig().services.order.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig().services.user.clientId,
            brokers: [kafkaConfig().broker],
          },
          consumer: {
            groupId: kafkaConfig().services.order.groupId,
          },
        },
      },
    ]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1h" },
      secret: process.env.SECRET_JWT,
    }),
  ],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
