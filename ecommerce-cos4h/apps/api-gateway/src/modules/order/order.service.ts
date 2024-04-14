import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    @Inject("MS-ORDERS")
    private readonly clientOrders: ClientKafka,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const response = await firstValueFrom(
      this.clientOrders.send("MS-ORDER-POST", createOrderDto),
    );
    return response;
  }

  findAll() {
    return this.clientOrders.send("MS-ORDERS-GET", {});
  }

  findOne(id: string) {
    const response = this.clientOrders.send("MS-ORDER-GET", id);
    return response;
  }

  update(id: string, updateOrderDto: Partial<CreateOrderDto>) {
    const response = this.clientOrders.send("MS-ORDER-PUT", {
      id,
      order: updateOrderDto,
    });
    return response;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  async onModuleInit() {
    this.clientOrders.subscribeToResponseOf("MS-ORDERS-GET");
    this.clientOrders.subscribeToResponseOf("MS-ORDER-POST");
    this.clientOrders.subscribeToResponseOf("MS-ORDER-GET");
    this.clientOrders.subscribeToResponseOf("MS-ORDER-PUT");
    await this.clientOrders.connect();
  }
}
