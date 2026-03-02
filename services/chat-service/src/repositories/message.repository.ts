import { randomUUID } from "node:crypto";

import { type WithId, type Document, ObjectId } from "mongodb";

import type { Message, MessageListOptions } from "@/types/message";

import { getMongoClient } from "@/clients/mongo.client";

const MESSAGES_COLLECTION = "messages";
