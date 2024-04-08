import * as dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = process.env.USERS_DB_HOST;
export const DB_PORT = parseInt(process.env.USERS_DB_PORT);
export const DB_USER = process.env.USERS_DB_USER;
export const DB_PASSWORD = process.env.USERS_DB_PASSWORD;
export const DB_DATABASE = process.env.USERS_DB_DATABASE;
export const DB_SID = process.env.USERS_DB_SID;
