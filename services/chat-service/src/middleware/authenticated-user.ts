import { HttpError, USER_ID_HEADER, z } from "@chatapp/common";
import type { RequestHandler } from "express";

const userIdSchema = z.string().uuid();

/**
 * Express middleware that authenticates requests in internal service-to-service communication.
 * Instead of verifying a JWT, it trusts the user ID forwarded via the
 * USER_ID_HEADER header (set by the API Gateway after authentication).
 *
 * Attaches the user to `req.user` if the header contains a valid UUID.
 * @throws {HttpError} 401 if the header is missing or not a valid UUID
 */
export const attachAuthenticatedUser: RequestHandler = (req, _res, next) => {
  try {
    const headerValue = req.header(USER_ID_HEADER);
    const userId = userIdSchema.parse(headerValue);
    req.user = { id: userId };
    next();
  } catch {
    next(new HttpError(401, "Invalid or missing user context"));
  }
};
