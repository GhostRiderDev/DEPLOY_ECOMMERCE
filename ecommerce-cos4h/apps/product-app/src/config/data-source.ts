import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProductEntity } from '../entity/ProductEntity';
import { CategoryEntity } from '../entity/CategoryEntity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PRODUCT_DB_HOST,
  port: +process.env.PRODUCT_DB_PORT,
  database: process.env.PRODUCT_DB_NAME,
  username: process.env.PRODUCT_DB_USERNAME,
  password: process.env.PRODUCT_DB_PASSWORD,
  entities: [ProductEntity, CategoryEntity],
  migrations: [],
  logging: ['error'],
  synchronize: true,
};

export default registerAs('data-source', () => config);
export const connectionSource = new DataSource(config);
