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

export const isAppErrorWithCode = (error: unknown, code: ErrorCode): boolean => {
  return error instanceof AppError && error.code === code;
};
