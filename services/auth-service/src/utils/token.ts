import { env } from "@/config/env";
import bcrypt from "bcrypt";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const ACCESS_TOKEN: Secret = env.JWT_SECRET;
const REFRESH_TOKEN: Secret = env.JWT_REFRESH_SECRET;
const ACCESS_OPTIONS: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
};
const REFRESH_OPTIONS: SignOptions = {
  expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};
