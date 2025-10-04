import { ErrorCode } from "./code";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly cause?: Error;

  constructor(code: ErrorCode, cause?: Error) {
    super();

    this.code = code;
    this.cause = cause;
  }
}
