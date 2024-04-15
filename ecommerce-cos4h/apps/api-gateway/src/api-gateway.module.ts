import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { OrderModule } from "./modules/order/order.module";
import { FileModule } from "./modules/file/file.module";

@Module({
  imports: [UsersModule, OrderModule, FileModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
