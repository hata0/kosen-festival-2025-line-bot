import { messagingApi } from "@line/bot-sdk";
import {
  GetReservationListInput,
  RESERVATION_ORDER,
  type ReservationRepository,
} from "@/internal/domain/reservation";
import type { AppConfig } from "../config/app";
import type { CronHandler } from "./handler";

export class CronHandlerImpl implements CronHandler {
  private readonly client: messagingApi.MessagingApiClient;

  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly config: AppConfig,
  ) {
    this.client = new messagingApi.MessagingApiClient({
      channelAccessToken: this.config.serverApi.lineChannelAccessToken,
    });
  }

  async cron(
    controller: ScheduledController,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(
      (async () => {
        switch (controller.cron) {
          case "*/5 * * * *": {
            // TODO: limitに任意の値をAppConstantから得られるようにする
            const reservations = await this.reservationRepository.getList(
              new GetReservationListInput(5, 1, RESERVATION_ORDER.ASCENDING),
            );
            await Promise.all(
              reservations.map(async ({ lineUserId }) => {
                // TODO: messageをTranslatorから取得する
                await this.client.pushMessage({
                  to: lineUserId,
                  messages: [
                    {
                      type: "text",
                      text: "予約順が近づいてきました。",
                    },
                  ],
                });
              }),
            );

            return;
          }
          default: {
            return;
          }
        }
      })(),
    );
  }
}
