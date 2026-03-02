/**
 * Extends the Express `Request` interface to include an optional `user` property
 * of type `AuthenticatedUser`. This allows TypeScript to recognize `req.user`
 * throughout the application without type errors.
 */

import type { AuthenticatedUser } from "@chatapp/common";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
