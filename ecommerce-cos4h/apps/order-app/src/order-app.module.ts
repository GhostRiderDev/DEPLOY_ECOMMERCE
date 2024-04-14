import { Module } from '@nestjs/common';
import { OrderAppService } from './order-app.service';
import { OrderAppController } from './order-app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dataSourceConfig from './config/data-source';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderDetail, OrderDetailSchema } from './schema/orderDetails.schema';
import { OrderDetailService } from './module/order-detail/order-detail/order-detail.service';
import { OrderDetailModule } from './module/order-detail/order-detail/order-detail.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataSourceConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('data-source'),
    }),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
    ClientsModule.register([
      {
        name: 'MS-PRODUCTS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'productClient',
            brokers: ['localhost:9092'],
          },
          consumer: { groupId: 'CONSUMER-PRODUCT' },
        },
      },
      {
        name: 'MS-USERS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orderClient',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'CONSUMER-USER',
          },
        },
      },
    ]),
  ],
  controllers: [OrderAppController],
  providers: [OrderAppService, OrderDetailModule, OrderDetailService],
})
export class OrderAppModule {}
