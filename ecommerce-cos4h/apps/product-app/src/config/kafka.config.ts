import { config as dotevConfig } from "dotenv";

dotevConfig({ path: ".env" });

export const kafkaConfig = () => ({
  broker: process.env.KAFKA_BROKER ?? "localhost:9092",
  services: {
    product: {
      clientId: "product",
      groupId: "product",
      name: "product-kafka-client",
    },
  },
});
