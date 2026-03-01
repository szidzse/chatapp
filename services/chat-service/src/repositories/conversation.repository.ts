import { randomUUID } from "node:crypto";
import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

import type {
  Conversation,
  ConversationFilter,
  ConversationSummary,
  CreateConversationInput,
} from "@/types/conversation";

import { getMongoClient } from "@/clients/mongo.client";

const CONVERSATION_COLLECTION = "conversations";
const MESSAGES_COLLECTION = "messages";

const toConversation = (doc: WithId<Document>): Conversation => ({
  id: String(doc._id),
  title: typeof doc.title === "string" ? doc.title : null,
  participantIds: Array.isArray(doc.participantIds)
    ? (doc.participantIds as string[])
    : [],
  createdAt: new Date(doc.createdAt as string | number | Date),
  updatedAt: new Date(doc.updatedAt as string | number | Date),
  lastMessageAt: doc.lastMessageAt
    ? new Date(doc.lastMessageAt as string | number | Date)
    : null,
  lastMessagePreview:
    typeof doc.lastMessagePreview === "string" ? doc.lastMessagePreview : null,
});

const toConversationSummary = (doc: WithId<Document>): ConversationSummary =>
  toConversation(doc);
