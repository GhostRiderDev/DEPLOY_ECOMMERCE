import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [UsersModule, OrderModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
