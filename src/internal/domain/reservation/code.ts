import { ErrorCode } from "../error";

export const RESERVATION_ERROR_CODE = {
  VALIDATION_ERROR: Symbol("VALIDATION_ERROR") as ErrorCode,
  DUPLICATE: Symbol("DUPLICATE") as ErrorCode,
  NOT_FOUND: Symbol("NOT_FOUND") as ErrorCode,
} as const;