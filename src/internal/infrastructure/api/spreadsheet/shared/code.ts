import type { ErrorCode } from "@/internal/domain/error";

export const SPREADSHEET_API_ERROR_CODE = {
  REQUEST_FAILED: Symbol("REQUEST_FAILED") as ErrorCode,
} as const;
