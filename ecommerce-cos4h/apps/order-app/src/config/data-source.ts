import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

dotenvConfig({ path: ".env" });

const config = {
  uri: `mongodb://${process.env.ORDER_DB_HOST}:${process.env.ORDER_DB_PORT}/${process.env.ORDER_DB_NAME}`,
  user: process.env.ORDER_DB_USERNAME,
  pass: process.env.ORDER_DB_PASSWORD,
  uriDeploy: process.env.ORDER_URI_DEPLOY,
};

export default registerAs("data-source", () => config);
