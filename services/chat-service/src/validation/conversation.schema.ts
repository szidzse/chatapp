import { z } from "@chatapp/common";

export const createConversationSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  participantIds: z.array(z.string().uuid()).min(1),
});

export const listConversationQuerySchema = z.object({
  participantIds: z.string().uuid().optional(),
});
