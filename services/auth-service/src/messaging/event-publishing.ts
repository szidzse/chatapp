import {
  AUTH_EVENT_EXCHANGE,
  AUTH_USER_REGISTERED_ROUTING_KEY,
  type AuthUserRegisteredPayload,
} from "@chatapp/common";
import { connect, type Channel, type ChannelModel } from "amqplib";

import { env } from "@/config/env";
import { logger } from "@/utils/logger";

let connectionRef: ChannelModel | null = null;
let channel: Channel | null = null;

export const initPublisher = async () => {
  if (!env.RABBITMQ_URL) {
    logger.warn(
      "RABBITMQ_URL is not defined. Skipping RabbitMQ initialization.",
    );
    return;
  }

  if (channel) {
    return;
  }

  const connection = await connect(env.RABBITMQ_URL);
  connectionRef = connection;
  channel = await connection.createChannel();
  await channel.assertExchange(AUTH_EVENT_EXCHANGE, "topic", { durable: true });

  connection.on("close", () => {
    logger.warn("RabbitMQ connection closed");
    channel = null;
    connectionRef = null;
  });
  connection.on("error", (err) => {
    logger.error({ err }, "RabbitMQ connection error");
  });

  logger.info("Auth service RabbitMQ publisher initialized");
};
