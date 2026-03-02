import { randomUUID } from "node:crypto";

import { type WithId, type Document, ObjectId } from "mongodb";

import type { Message, MessageListOptions } from "@/types/message";

import { getMongoClient } from "@/clients/mongo.client";

const MESSAGES_COLLECTION = "messages";

const toMessage = (doc: WithId<Document>): Message => ({
  id: String(doc._id),
  conversationId: String(doc.conversationId),
  senderId: String(doc.senderId),
  body: String(doc.body),
  createdAt: new Date(doc.createdAt as string | number | Date),
  reactions: Array.isArray(doc.reactions)
    ? doc.reactions.map((r: WithId<Document>) => ({
        emoji: String(r.emoji),
        userId: String(r.userId),
        createdAt: new Date(r.createdAt as string | number | Date),
      }))
    : [],
});
