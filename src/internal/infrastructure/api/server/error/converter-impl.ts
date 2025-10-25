import type { i18n } from "i18next";
import { AppError } from "@/internal/domain/error";
import { RESERVATION_ERROR_CODE } from "@/internal/domain/reservation";
import { SPREADSHEET_API_ERROR_CODE } from "../../spreadsheet/shared/error";
import type { ErrorConverter } from "./converter";

export class ErrorConverterImpl implements ErrorConverter {
  constructor(private readonly translator: i18n) {}

  toMessage(error: unknown): string {
    if (error instanceof AppError) {
      switch (error.code) {
        case RESERVATION_ERROR_CODE.VALIDATION_ERROR:
          return this.translator.t("error.reservation.validation_error");
        case RESERVATION_ERROR_CODE.DUPLICATE:
          return this.translator.t("error.reservation.duplicate");
        case RESERVATION_ERROR_CODE.NOT_FOUND:
          return this.translator.t("error.reservation.not_found");
        case SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED:
          return this.translator.t("error.spreadsheet_api.request_failed");
        default:
          return this.translator.t("error.unknown");
      }
    } else {
      return this.translator.t("error.unknown");
    }
  }
}
