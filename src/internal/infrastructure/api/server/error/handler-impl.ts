import type { Context } from "hono";
import type { ErrorHandler } from "./handler";

export class ErrorHandlerImpl implements ErrorHandler {
  error(error: unknown, c: Context): Response {
    console.error("ErrorHandler:", error);
    return c.json(undefined, 500);
  }
}
