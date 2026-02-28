import { HttpError, type AuthenticatedUser } from "@chatapp/common";
import jwt from "jsonwebtoken";

import type { RequestHandler } from "express";

import { env } from "@/config/env";

interface AccessTokenClaims {
  sub: string;
  email?: string;
}

/**
 * Extracts and validates the Bearer token from the Authorization header.
 * @param value - The raw Authorization header value (e.g. "Bearer <token>")
 * @returns The extracted JWT token string
 * @throws {HttpError} 401 if the header is missing or not a valid Bearer token
 */
const parseAuthorizationHeader = (value: string | undefined): string => {
  if (!value) {
    throw new HttpError(401, "Unauthorized");
  }

  const [scheme, token] = value.split(" ");

  if (scheme.toLowerCase() !== "bearer" || !token) {
    throw new HttpError(401, "Unauthorized");
  }

  return token;
};

/**
 * Converts JWT claims into an AuthenticatedUser object.
 * @param claims - The decoded JWT payload
 * @returns An AuthenticatedUser object containing the user's id and optional email
 * @throws {HttpError} 401 if the `sub` claim is missing
 */
const toAuthenticatedUser = (claims: AccessTokenClaims): AuthenticatedUser => {
  if (!claims.sub) {
    throw new HttpError(401, "Unauthorized");
  }

  return {
    id: claims.sub,
    email: claims.email,
  };
};

/**
 * Express middleware that protects routes by verifying the JWT access token.
 * Attaches the authenticated user to `req.user` if the token is valid.
 * Responds with a 401 HttpError if the token is missing, invalid, or expired.
 */
export const requireAuth: RequestHandler = (req, _res, next) => {
  try {
    const token = parseAuthorizationHeader(req.headers.authorization);
    const claims = jwt.verify(token, env.JWT_SECRET) as AccessTokenClaims;
    req.user = toAuthenticatedUser(claims);
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    next(new HttpError(401, "Unauthorized"));
  }
};
