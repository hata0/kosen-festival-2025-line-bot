import {
  type LineWebhookHandler,
  LineWebhookHandlerImpl,
} from "../../../api/server/http/v1/webhook/line";
import type { ConfigContainer } from "../../config";
import type { UsecaseContainer } from "../../usecase";

export class ServerApiContainer {
  public readonly lineWebhookHandler: LineWebhookHandler;

  constructor(usecase: UsecaseContainer, config: ConfigContainer) {
    this.lineWebhookHandler = new LineWebhookHandlerImpl(
      usecase.reservationUsecase,
      config.appConfig,
    );
  }
}
