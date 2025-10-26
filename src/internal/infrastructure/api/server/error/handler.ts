import type { Context } from "hono";

export interface ErrorHandler {
  error(error: unknown, c: Context): Response;
}
