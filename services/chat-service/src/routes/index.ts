import type { Router } from "express";

import { conversationRouter } from "@/routes/conversation.routes";

export const registerRoutes = (app: Router) => {
  // Health check endpoint for Docker and Kubernetes
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK", service: "chat-service" });
  });

  app.use("/conversations", conversationRouter);
};
