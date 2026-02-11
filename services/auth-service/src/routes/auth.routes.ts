import { Router } from "express";
import { registerHandler } from "@/controllers/auth.controller";
import { validateRequest } from "@chatapp/common";

export const authRouter: Router = Router();

authRouter.post("/register", validateRequest({}), registerHandler);
