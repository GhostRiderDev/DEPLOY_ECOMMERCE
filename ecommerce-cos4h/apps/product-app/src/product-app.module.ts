import { Module } from '@nestjs/common';
import { ProductAppController } from './product-app.controller';
import { ProductAppService } from './product-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'product_mcsv',
      entities: [ProductEntity],
      synchronize: true,
      logging: ['error'],
    }),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [ProductAppController],
  providers: [ProductAppService],
})
export class ProductAppModule {
  constructor(private readonly dataSource: DataSource) {}
}
