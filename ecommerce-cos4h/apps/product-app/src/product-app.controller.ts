import { Controller } from '@nestjs/common';
import { ProductAppService } from './product-app.service';
import { MessagePattern } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Controller()
export class ProductAppController {
  constructor(private readonly productAppService: ProductAppService) {}

  @MessagePattern('MS-PRODUCTS-GET')
  async getProducts(): Promise<any> {
    const products = await this.productAppService.findAll();
    return products;
  }

  @MessagePattern('MS-PRODUCT-GET')
  async getProduct({ id }: { id: UUID }): Promise<any> {
    const product = await this.productAppService.findOne(id);
    return product;
  }

  @MessagePattern('MS-PRODUCTS-CREATE')
  createProduct(product: any): Promise<any> {
    return this.productAppService.create(product);
  }

  @MessagePattern('MS-PRODUCTS-UPDATE')
  updateProduct(data: { id: string; product }): Promise<any> {
    return this.productAppService.update(data.id, data.product);
  }

  @MessagePattern('MS-PRODUCTS-DELETE')
  deleteProduct(id: string): Promise<void> {
    return this.productAppService.delete(id);
  }
}
