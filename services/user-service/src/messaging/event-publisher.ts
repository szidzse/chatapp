import {
  USER_EVENTS_EXCHANGE,
  USER_CREATED_ROUTING_KEY,
} from "@chatapp/common";
import amqplib from "amqplib";

import type { UserCreatedEvent, UserCreatedPayload } from "@chatapp/common";
import type { Channel, ChannelModel, Connection } from "amqplib";

import { env } from "@/config/env";
import { logger } from "@/utils/logger";

type ManageConnection = Connection &
  Pick<ChannelModel, "close" | "createChannel">;

let connection: ManageConnection | null = null;
let channel: Channel | null = null;

const messagingEnabled = Boolean(env.RABBITMQ_URL);

const ensureChannel = async (): Promise<Channel | null> => {
  if (!messagingEnabled) {
    return null;
  }

  if (channel) {
    return channel;
  }

  if (!env.RABBITMQ_URL) {
    return null;
  }

  const amqpConnection = (await amqplib.connect(
    env.RABBITMQ_URL,
  )) as unknown as ManageConnection;
  connection = amqpConnection;

  amqpConnection.on("close", () => {
    logger.warn("RabbitMQ connection closed");
    connection = null;
    channel = null;
  });

  amqpConnection.on("error", (error) => {
    logger.error({ err: error }, "RabbitMQ connection error");
  });

  const amqpChannel = await amqpConnection.createChannel();
  channel = amqpChannel;
  await amqpChannel.assertExchange(USER_EVENTS_EXCHANGE, "topic", {
    durable: true,
  });

  return amqpChannel;
};
