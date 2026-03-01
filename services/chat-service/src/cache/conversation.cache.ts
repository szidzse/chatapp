import type { Conversation } from "@/types/conversation";

import { getRedisClient } from "@/clients/redis.client";

const CACHE_PREFIX = "conversation";
const CACHE_TTL_SECONDS = 60;

const serialize = (conversation: Conversation): string => {
  return JSON.stringify({
    ...conversation,
    createdAt: conversation.createdAt.toISOString(),
    updatedAt: conversation.updatedAt.toISOString(),
  });
};

const deserialize = (raw: string): Conversation => {
  const parsed = JSON.parse(raw) as Conversation & {
    createdAt: string;
    updatedAt: string;
  };

  return {
    ...parsed,
    createdAt: new Date(parsed.createdAt),
    updatedAt: new Date(parsed.updatedAt),
  };
};
