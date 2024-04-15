import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { UUID } from "crypto";
import { firstValueFrom } from "rxjs";
import { ProductDto } from "../product/dto/product.dto";

@Injectable()
export class FileService implements OnModuleInit {
  constructor(
    @Inject("MS-FILES") private readonly clientFiles: ClientKafka,
    @Inject("MS-PRODUCTS") private readonly clientProducts: ClientKafka,
    @Inject("MS-ORDERS") private readonly clientOrders: ClientKafka,
  ) {}
  async create(id: UUID, file: Express.Multer.File) {
    const product: ProductDto = await firstValueFrom(
      this.clientProducts.send("MS-PRODUCT-GET", id),
    );
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const urlHttps = await firstValueFrom(
      this.clientFiles.send("MS-FILE-PRODUCT-POST", file),
    );
    this.clientFiles.emit("MS-FILE-DELETE", product.imageUrl);
    product.imageUrl = urlHttps;
    const dataToEmit = {
      id,
      product,
    };
    this.clientProducts.emit("MS-PRODUCT-PUT", dataToEmit);
    this.clientOrders.emit("MS-ORDER-UPDATE-PRODUCT-IMAGE", {
      id,
      url: urlHttps,
    });
    return urlHttps;
  }

  async onModuleInit() {
    this.clientFiles.subscribeToResponseOf("MS-FILE-PRODUCT-POST");
    this.clientProducts.subscribeToResponseOf("MS-PRODUCT-GET");
    await this.clientFiles.connect();
    await this.clientProducts.connect();
    await this.clientOrders.connect();
  }

  update() {}
}
