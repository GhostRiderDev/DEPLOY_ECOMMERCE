import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { kafkaConfig } from "../../config/kafka.config";
import { UsersService } from "../users/users.service";

// kafkaConfig().services.order.name
@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    @Inject("SERVICIO-ORDEN")
    private readonly clientOrders: ClientKafka,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const response = await firstValueFrom(
      this.clientOrders.send("MS-ORDER-POST", createOrderDto),
    );
    return response;
  }

  findAll(page: number, limit: number) {
    return this.clientOrders.send("MS-ORDERS-GET", { page, limit });
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

  async findUserOrders(idUser: String) {
    const orders = await firstValueFrom(
      this.clientOrders.send("ORDENES-USUARIO", idUser),
    );
    return orders;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  async onModuleInit() {
    this.clientOrders.subscribeToResponseOf("MS-ORDERS-GET");
    this.clientOrders.subscribeToResponseOf("MS-ORDER-POST");
    this.clientOrders.subscribeToResponseOf("MS-ORDER-GET");
    this.clientOrders.subscribeToResponseOf("MS-ORDER-PUT");
    this.clientOrders.subscribeToResponseOf("ORDENES-USUARIO");
    await this.clientOrders.connect();
  }
}
