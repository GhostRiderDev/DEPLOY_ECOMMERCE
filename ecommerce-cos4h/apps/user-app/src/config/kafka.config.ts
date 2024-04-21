import { config as dotevConfig } from "dotenv";

dotevConfig({ path: ".env" });

export const kafkaConfig = () => ({
  broker: process.env.KAFKA_BROKER ?? "localhost:29092",
  services: {
    user: {
      clientId: "user",
      groupId: "user",
      name: "user-kafka-client",
    },
    order: {
      clientId: "order",
      groupId: "order",
      name: "order-kafka-client",
    },
  },
});
