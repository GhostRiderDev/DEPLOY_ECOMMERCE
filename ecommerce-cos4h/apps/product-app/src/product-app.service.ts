import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./entity/ProductEntity";

@Injectable()
export class ProductAppService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<ProductEntity> {
    const productDB = await this.productRepository.findOneBy({ id });
    if (!productDB) {
      return {
        id,
        name: null,
        description: null,
        price: null,
        stock: null,
        imageUrl: null,
        idCategory: null,
        category: null,
      };
    }
    return productDB;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }

  async update(id: string, product: ProductEntity): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async reduceStock(id: string): Promise<void> {
    const productDB = await this.productRepository.findOneBy({ id });
    if (!productDB) {
      throw new NotFoundException("Product not found");
    }
    productDB.stock -= 1;
    await this.productRepository.update(id, productDB);
  }
}
