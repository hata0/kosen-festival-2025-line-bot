import type { i18n } from "i18next";
import {
  type ErrorConverter,
  ErrorConverterImpl,
  type ErrorHandler,
  ErrorHandlerImpl,
} from "@/internal/infrastructure/api/server/error";
import {
  type LineWebhookHandler,
  LineWebhookHandlerImpl,
} from "../../../api/server/http/v1/webhook/line";
import type { CommonContainer } from "../../common";
import type { ConfigContainer } from "../../config";
import type { UsecaseContainer } from "../../usecase";

export class ServerApiContainer {
  public readonly errorConverter: ErrorConverter;
  public readonly errorHandler: ErrorHandler = new ErrorHandlerImpl();
  public readonly lineWebhookHandler: LineWebhookHandler;

  constructor(
    usecase: UsecaseContainer,
    config: ConfigContainer,
    translator: i18n,
    common: CommonContainer,
  ) {
    this.errorConverter = new ErrorConverterImpl(translator);
    this.lineWebhookHandler = new LineWebhookHandlerImpl(
      usecase.reservationUsecase,
      config.appConfig,
      translator,
      this.errorConverter,
      common.time,
    );
  }
}
