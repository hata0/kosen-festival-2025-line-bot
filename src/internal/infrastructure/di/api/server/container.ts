import type { i18n } from "i18next";
import {
  type ErrorConverter,
  ErrorConverterImpl,
} from "@/internal/infrastructure/api/server/error";
import {
  type LineWebhookHandler,
  LineWebhookHandlerImpl,
} from "../../../api/server/http/v1/webhook/line";
import type { ConfigContainer } from "../../config";
import type { UsecaseContainer } from "../../usecase";

export class ServerApiContainer {
  public readonly errorConverter: ErrorConverter;
  public readonly lineWebhookHandler: LineWebhookHandler;

  constructor(
    usecase: UsecaseContainer,
    config: ConfigContainer,
    translator: i18n,
  ) {
    this.errorConverter = new ErrorConverterImpl(translator);
    this.lineWebhookHandler = new LineWebhookHandlerImpl(
      usecase.reservationUsecase,
      config.appConfig,
      translator,
      this.errorConverter,
    );
  }
}
