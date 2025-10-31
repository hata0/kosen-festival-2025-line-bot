import { messagingApi } from "@line/bot-sdk";
import {
  GetReservationListQuery,
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

  // TODO: エラーハンドリングが雑なので、改善する
  async cron(
    controller: ScheduledController,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(
      (async () => {
        try {
          switch (controller.cron) {
            case "*/5 * * * *": {
              // TODO: limitに任意の値をAppConstantから得られるようにする
              const reservations = await this.reservationRepository.getList(
                new GetReservationListQuery(5, 1, RESERVATION_ORDER.ASCENDING),
              );
              await Promise.all(
                reservations.map(async (reservation) => {
                  // TODO: messageをTranslatorから取得する
                  await this.client.pushMessage({
                    to: reservation.lineUserId,
                    messages: [
                      {
                        type: "text",
                        text: `まもなくご予約の時間です！\nご来場時は、スタッフに確認コードをお伝えください。\n(確認コードは予約内容を照合するために使用します。)\n\n確認コード\n${reservation.confirmationCode}`,
                      },
                    ],
                  });
                }),
              );

              return;
            }
            default: {
              console.error("CronError:", controller);
              return;
            }
          }
        } catch (error) {
          console.error("CronError:", error);
        }
      })(),
    );
  }
}
