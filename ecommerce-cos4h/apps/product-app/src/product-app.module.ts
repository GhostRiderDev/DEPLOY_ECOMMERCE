import { Module } from '@nestjs/common';
import { ProductAppController } from './product-app.controller';
import { ProductAppService } from './product-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dataSourceConfig from './config/data-source';
import { ProductEntity } from './entity/ProductEntity';
import { CategoryEntity } from './entity/CategoryEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('data-source'),
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  controllers: [ProductAppController],
  providers: [ProductAppService],
})
export class ProductAppModule {}
