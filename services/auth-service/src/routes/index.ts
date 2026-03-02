import { Router } from "express";
import { authRouter } from "@/routes/auth.routes";

export const registerRoutes = (app: Router) => {
  // Health check endpoint for Docker and Kubernetes
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK", service: "auth-service" });
  });

  app.use("/auth", authRouter);
};
