import { asyncHandler, HttpError, type AsyncHandler } from "@chatapp/common";
import type { RequestHandler } from "express";
import { conversationService } from "@/services/conversation.service";
import {
  createConversationSchema,
  listConversationQuerySchema,
} from "@/validation/conversation.schema";
import { conversationIdParamsSchema } from "@/validation/shared.schema";
import { getAuthenticatedUser } from "@/utils/auth";

const parsedConversation = (params: unknown) => {
  const { id } = conversationIdParamsSchema.parse(params);
  return id;
};

export const createConversation: RequestHandler = asyncHandler(
  async (req, res) => {
    const user = getAuthenticatedUser(req);
    const payload = createConversationSchema.parse(req.body);
    const uniqueParticipantIds = Array.from(
      new Set([...payload.participantIds, user.id]),
    );

    if (uniqueParticipantIds.length < 2) {
      throw new HttpError(
        400,
        "Conversation must atleast include one other participant",
      );
    }

    const conversation = await conversationService.createConversation({
      title: payload.title,
      participantIds: uniqueParticipantIds,
    });

    res.status(201).json({ data: conversation });
  },
);
