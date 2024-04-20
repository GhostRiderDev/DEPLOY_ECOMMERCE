import { config as dotevConfig } from "dotenv";

dotevConfig({ path: ".env" });

export const kafkaConfig = () => ({
  broker: process.env.KAFKA_BROKER ?? "localhost:9092",
  services: {
    order: {
      clientId: "order",
      groupId: "order",
      name: "order-kafka-client",
    },
    product: {
      clientId: "product",
      groupId: "product",
      name: "product-kafka-client",
    },
    user: {
      clientId: "user",
      groupId: "user",
      name: "user-kafka-client",
    },
  },
});
