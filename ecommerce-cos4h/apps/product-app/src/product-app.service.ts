import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAppService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
