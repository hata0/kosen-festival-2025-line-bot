import {
  messagingApi,
  validateSignature,
  type WebhookRequestBody,
} from "@line/bot-sdk";
import type { Context, TypedResponse } from "hono";
import type { i18n } from "i18next";
import { RESERVATION_STATUS } from "@/internal/domain/reservation";
import type { AppConfig } from "@/internal/infrastructure/config/app";
import {
  CreateReservationInput,
  GetReservationByLineUserIdInput,
  type ReservationUsecase,
  UpdateReservationInput,
} from "@/internal/usecase/reservation";
import type { ErrorConverter } from "../../../../error";

export interface LineWebhookHandler {
  post(c: Context): Promise<TypedResponse<undefined>>;
}

export class LineWebhookHandlerImpl implements LineWebhookHandler {
  private readonly client: messagingApi.MessagingApiClient;

  constructor(
    private readonly reservationUsecase: ReservationUsecase,
    private readonly config: AppConfig,
    private readonly translator: i18n,
    private readonly errorConverter: ErrorConverter,
  ) {
    this.client = new messagingApi.MessagingApiClient({
      channelAccessToken: this.config.serverApi.lineChannelAccessToken,
    });
  }

  async post(c: Context) {
    const textBody = await c.req.text();
    const signature = c.req.header("x-line-signature");

    // 署名検証
    if (
      signature === undefined ||
      validateSignature(
        textBody,
        this.config.serverApi.lineChannelSecret,
        signature,
      )
    ) {
      c.json(undefined, 401);
    }

    const body = JSON.parse(textBody) as WebhookRequestBody;

    // Cloudflare Workersの場合、長い処理のタスクはバックグランドで実行する必要がある
    c.executionCtx.waitUntil(
      (async () => {
        await Promise.all(
          body.events.map(async (e) => {
            const userId = e.source.userId;
            if (userId === undefined) {
              return;
            }

            switch (e.type) {
              case "message": {
                switch (e.message.type) {
                  case "text": {
                    try {
                      switch (e.message.text) {
                        case "予約情報": {
                          await this.reservationUsecase.getByLineUserId(
                            new GetReservationByLineUserIdInput(userId),
                          );
                          await this.client.pushMessage({
                            to: userId,
                            messages: [
                              {
                                type: "text",
                                text: this.translator.t(
                                  "reservations.get_detail.message",
                                ),
                              },
                            ],
                          });

                          return;
                        }
                        case "予約作成": {
                          await this.reservationUsecase.create(
                            new CreateReservationInput(userId),
                          );
                          await this.client.pushMessage({
                            to: userId,
                            messages: [
                              {
                                type: "text",
                                text: this.translator.t(
                                  "reservations.create.message",
                                ),
                              },
                            ],
                          });

                          return;
                        }
                        case "予約キャンセル": {
                          const reservation =
                            await this.reservationUsecase.getByLineUserId(
                              new GetReservationByLineUserIdInput(userId),
                            );
                          await this.reservationUsecase.update(
                            new UpdateReservationInput(
                              reservation.id,
                              RESERVATION_STATUS.COMPLETED,
                            ),
                          );
                          await this.client.pushMessage({
                            to: userId,
                            messages: [
                              {
                                type: "text",
                                text: this.translator.t(
                                  "reservations.cancel.message",
                                ),
                              },
                            ],
                          });

                          return;
                        }
                        default: {
                          return;
                        }
                      }
                    } catch (error) {
                      await this.client.pushMessage({
                        to: userId,
                        messages: [
                          {
                            type: "text",
                            text: this.errorConverter.toMessage(error),
                          },
                        ],
                      });
                    }

                    return;
                  }
                  default: {
                    return;
                  }
                }
              }
              default: {
                return;
              }
            }
          }),
        );
      })(),
    );

    return c.json(undefined, 200);
  }
}
