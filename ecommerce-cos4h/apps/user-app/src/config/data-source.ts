import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'oracle',
  host: process.env.USERS_DB_HOST,
  port: +process.env.USERS_DB_PORT,
  database: process.env.USERS_DB_NAME,
  username: process.env.USERS_DB_USERNAME,
  password: process.env.USERS_DB_PASSWORD,
  sid: process.env.USERS_DB_SID,
  entities: [UserEntity],
  migrations: [],
  logging: ['error'],
  synchronize: true,
};

export default registerAs('data-source', () => config);
export const connectionSource = new DataSource(config);
