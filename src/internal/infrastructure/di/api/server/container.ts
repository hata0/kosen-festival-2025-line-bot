import { LineWebhookHandler, LineWebhookHandlerImpl } from "../../../api/server/http/v1/webhook/line";
import { ConfigContainer } from "../../config";
import { UsecaseContainer } from "../../usecase";

export class ServerApiContainer {
    public readonly lineWebhookHandler: LineWebhookHandler

    constructor(usecase: UsecaseContainer, config: ConfigContainer){
        this.lineWebhookHandler = new LineWebhookHandlerImpl(usecase.reservationUsecase, config.appConfig)
    }
}