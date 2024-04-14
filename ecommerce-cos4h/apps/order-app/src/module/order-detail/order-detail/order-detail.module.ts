import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
