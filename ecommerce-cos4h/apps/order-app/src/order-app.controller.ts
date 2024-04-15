import { Body, Controller, Get } from "@nestjs/common";
import { OrderAppService } from "./order-app.service";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { OrderDto } from "./dto/order.dto";
import { UUID } from "crypto";

@Controller()
export class OrderAppController {
  constructor(private readonly orderAppService: OrderAppService) {}

  @MessagePattern("MS-ORDER-POST")
  async addOrder(order: OrderDto) {
    const response = await this.orderAppService.saveOrder(order);
    return response;
  }

  @MessagePattern("MS-ORDERS-GET")
  getOrders() {
    return this.orderAppService.findOrders();
  }

  @MessagePattern("MS-ORDER-GET")
  async getOrder(id: string) {
    const order = await this.orderAppService.findOrder(id);
    return JSON.stringify(order);
  }

  @MessagePattern("MS-ORDER-PUT")
  updateOrder({ id, order }: { id: UUID; order: OrderDto }) {
    return this.orderAppService.updateOrder(id, order);
  }

  @MessagePattern("MS-ORDERS-USER-GET")
  getOrdersUser(id_user: string) {
    return this.orderAppService.findOrdersUser(id_user);
  }

  @EventPattern("MS-ORDER-UPDATE-PRODUCT-IMAGE")
  updateProductImage(data: { id: string; url: string }) {
    this.orderAppService.updateImageUrlProduct(data.id, data.url);
  }
}
