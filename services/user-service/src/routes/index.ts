import type { Router } from "express";
import { userRoutes } from "./user.routes";

export const registerRoutes = (app: Router) => {
  // Health check endpoint for Docker and Kubernetes
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK", service: "user-service" });
  });

  app.use("/users", userRoutes);
};
