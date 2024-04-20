import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientKafka, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ProductReceivedDto } from "./dto/productReceived.dto";
import { OrderDetail } from "apps/order-app/src/schema/orderDetails.schema";
import { kafkaConfig } from "./../../../config/kafka.config";

@Injectable()
export class OrderDetailService implements OnModuleInit {
  constructor(
    @InjectModel("OrderDetail") private orderDetailModel: Model<OrderDetail>,
    @Inject(kafkaConfig().services.product.name)
    private clientOrders: ClientKafka,
  ) {}
  async create(ids_products: string[]) {
    try {
      const allProducts = await Promise.all(
        ids_products.map(async (id) => {
          const product = await firstValueFrom(
            this.clientOrders.send("MS-PRODUCT-GET", id),
          );
          if (!product.name) {
            throw new BadRequestException(`Product with id ${id} not found`);
          }
          return product;
        }),
      );
      const totalPrice = this.calculateTotalPrice(allProducts);
      const orderDetailToSave = new this.orderDetailModel();
      orderDetailToSave.price = totalPrice;
      orderDetailToSave.products = allProducts;
      orderDetailToSave.save();
      return { status: 201, data: orderDetailToSave._id };
    } catch (error) {
      throw error;
    }
  }

  calculateTotalPrice(orderDetail: ProductReceivedDto[]) {
    return orderDetail.reduce((acc, product) => {
      if (product.stock === 0) return acc;
      return acc + Number(product.price);
    }, 0);
  }

  async updateUrlProductImage(idProduct: string, newImageUrl: string) {
    try {
      await this.orderDetailModel.updateMany(
        { "products.id": idProduct },
        { $set: { "products.$[prod].imageUrl": newImageUrl } },
        { arrayFilters: [{ "prod.id": idProduct }] },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async onModuleInit() {
    this.clientOrders.subscribeToResponseOf("MS-PRODUCT-GET");
    await this.clientOrders.connect();
  }
}
