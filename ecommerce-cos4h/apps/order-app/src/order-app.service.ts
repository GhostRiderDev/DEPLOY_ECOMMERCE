import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { Order } from "./schema/order.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderDto } from "./dto/order.dto";
import { OrderDetailService } from "./module/order-detail/order-detail/order-detail.service";
import { ClientKafka, RpcException } from "@nestjs/microservices";
import { Console } from "console";
import { UUID } from "crypto";

@Injectable()
export class OrderAppService implements OnModuleInit {
  constructor(
    @InjectModel("Order")
    private readonly orderModel: Model<Order>,
    private readonly orderDetailService: OrderDetailService,
    @Inject("MS-USERS")
    private readonly clientUsers: ClientKafka,
  ) {}

  async saveOrder(order: OrderDto) {
    try {
      const responseDetail = await this.orderDetailService.create(
        order.ids_products,
      );

      if (responseDetail.status !== 201) {
        return responseDetail;
      }
      const orderToSave = new this.orderModel();
      orderToSave.date = new Date();
      orderToSave.id_user = order.id_user;
      orderToSave.order_detail_id = responseDetail.data;
      await orderToSave.save();
      return { status: 201, data: "Order saved" };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { status: 400, data: error.message };
      } else {
        return { status: 500, data: "Internal server error" };
      }
    }
  }

  async findOrders() {
    const orders = await this.orderModel
      .find()
      .populate("order_detail_id")
      .exec();
    return orders;
  }

  async findOrdersUser(id_user: string) {
    const orders = await this.orderModel
      .find({ id_user })
      .populate("order_detail_id")
      .exec();
    return { orders };
  }

  async findOrder(id: string) {
    const order = await this.orderModel
      .findById(Object(id))
      .populate("order_detail_id")
      .exec();
    if (!order) {
      return new RpcException("Order not found");
    }
    return order;
  }

  async updateOrder(id: UUID, order: OrderDto) {
    const orderToUpdate = await this.orderModel.findById(id).exec();
    if (!orderToUpdate) {
      return new RpcException("Order not found");
    }
    orderToUpdate.id_user = order.id_user;
    orderToUpdate.date = new Date();
    await orderToUpdate.save();
    return { status: 200, data: "Order updated" };
  }

  updateImageUrlProduct(idProduct: string, newImgUrl: string) {
    this.orderDetailService.updateUrlProductImage(idProduct, newImgUrl);
  }
  async onModuleInit() {
    this.clientUsers.subscribeToResponseOf("MS-USER-GET");
    await this.clientUsers.connect();
  }
}
