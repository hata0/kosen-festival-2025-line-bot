import { AppError } from "@/internal/domain/error";
import { RESERVATION_ERROR_CODE } from "@/internal/domain/reservation";
import { SPREADSHEET_API_ERROR_CODE } from "../../spreadsheet/shared/error";

export const errorToMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    switch (error.code) {
      case RESERVATION_ERROR_CODE.VALIDATION_ERROR:
        return "";
      case RESERVATION_ERROR_CODE.DUPLICATE:
        return "";
      case RESERVATION_ERROR_CODE.NOT_FOUND:
        return "";
      case SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED:
        return "";
      default:
        return "";
    }
  } else {
    return "";
  }
};
