import { HttpError } from "@chatapp/common";
import axios from "axios";

import { env } from "@/config/env";

const client = axios.create({
  baseURL: env.CHAT_SERVICE_URL,
  timeout: 5000,
});

const authHeader = {
  headers: {
    "X-Internal-Token": env.INTERNAL_API_TOKEN,
  },
} as const;
