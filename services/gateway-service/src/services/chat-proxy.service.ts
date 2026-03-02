import { HttpError } from "@chatapp/common";
import axios, { AxiosRequestConfig } from "axios";

import { env } from "@/config/env";

const createClient = () => {
  const config: AxiosRequestConfig = {
    baseURL: env.CHAT_SERVICE_URL,
    timeout: 5000,
    headers: {
      "X-Internal-Token": env.INTERNAL_API_TOKEN,
    },
  };

  return axios.create(config);
};

const client = createClient();

const resolvedMessage = (status: number, data: unknown): string => {
  if (typeof data === "object" && data && "message" in data) {
    const message = (data as Record<string, unknown>).message;
    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  return status >= 500
    ? "Authentication service is unavailable"
    : "An error occurred while processing the request";
};

const handleAxiosError = (error: unknown): never => {
  if (!axios.isAxiosError(error) || !error.response) {
    throw new HttpError(500, "Authentication service is unavailable");
  }

  const { status, data } = error.response as { status: number; data: unknown };

  throw new HttpError(status, resolvedMessage(status, data));
};

export interface ConversationDto {
  id: string;
  title: string | null;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
}

export interface ReactionDto {
  emoji: string;
  userId: string;
  createdAt: string;
}

export interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  reactions: ReactionDto[];
}

export interface ConversationResponse {
  data: ConversationDto;
}

export interface ConversationListResponse {
  data: ConversationDto[];
}

export interface MessageResponse {
  data: MessageDto;
}

export interface MessageListResponse {
  data: MessageDto[];
}

export interface CreateConversationPayload {
  title?: string | null;
  participantIds: string[];
}

export interface CreateMessagePayload {
  body: string;
}
