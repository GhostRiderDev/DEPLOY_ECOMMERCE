import { config as dotevConfig } from "dotenv";

dotevConfig({ path: ".env" });

export const kafkaConfig = () => ({
  broker: process.env.KAFKA_BROKER ?? "localhost:9092",
  services: {
    file: {
      clientId: "file",
      groupId: "file",
      name: "file-kafka-client",
    },
    product: {
      clientId: "product",
      groupId: "product",
      name: "product-kafka-client",
    },
  },
});
