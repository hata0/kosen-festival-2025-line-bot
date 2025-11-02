import { tz } from "@date-fns/tz";
import {
  messagingApi,
  validateSignature,
  type WebhookRequestBody,
} from "@line/bot-sdk";
import { addMinutes, format } from "date-fns";
import type { Context, TypedResponse } from "hono";
import type { i18n } from "i18next";
import type { Time } from "@/internal/domain/common";
import { isAppErrorWithCode } from "@/internal/domain/error";
import { RESERVATION_ERROR_CODE } from "@/internal/domain/reservation";
import type { AppConfig } from "@/internal/infrastructure/config/app";
import {
  CreateReservationInput,
  GetReservationCountInput,
  type ReservationUsecase,
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
    private readonly time: Time,
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

            // TODO: リファクタリングする
            // LINE Botの利用可能期間の制限
            {
              const now = this.time.now();

              // 2025/11/1 09:30〜16:30
              const start1 = new Date("2025-11-01T09:30:00+09:00");
              const end1 = new Date("2025-11-01T16:30:00+09:00");

              // 2025/11/2 09:30〜14:30
              const start2 = new Date("2025-11-02T09:30:00+09:00");
              const end2 = new Date("2025-11-02T14:30:00+09:00");

              if (
                !(
                  (now >= start1 && now <= end1) ||
                  (now >= start2 && now <= end2)
                )
              ) {
                // await this.client.pushMessage({
                //   to: userId,
                //   messages: [
                //     {
                //       type: "text",
                //       text: "利用可能期間外のため、利用できません。",
                //     },
                //   ],
                // });
                return;
              }
            }

            switch (e.type) {
              case "message": {
                switch (e.message.type) {
                  case "text": {
                    try {
                      switch (e.message.text) {
                        case "予約情報": {
                          try {
                            // 予約済みの場合
                            const reservationOutput =
                              await this.reservationUsecase.getByLineUserId(
                                userId,
                              );
                            const countOutput =
                              await this.reservationUsecase.getCount(
                                new GetReservationCountInput({
                                  createdAtTo: reservationOutput.createdAt,
                                }),
                              );
                            // TODO: 1組あたりにかかる時間をService Repositoryから得る
                            const startedAt = addMinutes(
                              this.time.now(),
                              (countOutput.count - 1) * 7,
                            );
                            await this.client.replyMessage({
                              replyToken: e.replyToken,
                              messages: [
                                {
                                  type: "text",
                                  text: this.translator.t(
                                    "reservations.get_detail.reserved_message",
                                    {
                                      code: reservationOutput.confirmationCode,
                                      waitingCount: `${countOutput.count}`,
                                      startedAt: format(startedAt, "HH:mm", {
                                        in: tz("Asia/Tokyo"),
                                      }),
                                    },
                                  ),
                                },
                              ],
                            });

                            return;
                          } catch (error) {
                            if (
                              isAppErrorWithCode(
                                error,
                                RESERVATION_ERROR_CODE.NOT_FOUND,
                              )
                            ) {
                              // 未予約の場合
                              const countOutput =
                                await this.reservationUsecase.getCount(
                                  new GetReservationCountInput(),
                                );
                              // TODO: 1組あたりにかかる時間をService Repositoryから得る
                              const startedAt = addMinutes(
                                this.time.now(),
                                countOutput.count * 7,
                              );
                              await this.client.replyMessage({
                                replyToken: e.replyToken,
                                messages: [
                                  {
                                    type: "text",
                                    text: this.translator.t(
                                      "reservations.get_detail.not_reserved_message",
                                      {
                                        waitingCount: `${countOutput.count}`,
                                        startedAt: format(startedAt, "HH:mm", {
                                          in: tz("Asia/Tokyo"),
                                        }),
                                      },
                                    ),
                                  },
                                ],
                              });
                              return;
                            }

                            throw error;
                          }
                        }
                        case "予約作成": {
                          const createOutput =
                            await this.reservationUsecase.create(
                              new CreateReservationInput(userId),
                            );
                          const reservationOutput =
                            await this.reservationUsecase.getById(
                              createOutput.id,
                            );
                          const countOutput =
                            await this.reservationUsecase.getCount(
                              new GetReservationCountInput({
                                createdAtTo: reservationOutput.createdAt,
                              }),
                            );
                          // TODO: 1組あたりにかかる時間をService Repositoryから得る
                          const startedAt = addMinutes(
                            this.time.now(),
                            (countOutput.count - 1) * 7,
                          );
                          await this.client.replyMessage({
                            replyToken: e.replyToken,
                            messages: [
                              {
                                type: "text",
                                text: this.translator.t(
                                  "reservations.create.message",
                                  {
                                    code: reservationOutput.confirmationCode,
                                    waitingCount: `${countOutput.count}`,
                                    startedAt: format(startedAt, "HH:mm", {
                                      in: tz("Asia/Tokyo"),
                                    }),
                                  },
                                ),
                              },
                            ],
                          });

                          return;
                        }
                        case "予約キャンセル": {
                          const reservation =
                            await this.reservationUsecase.getByLineUserId(
                              userId,
                            );
                          await this.reservationUsecase.delete(reservation.id);
                          await this.client.replyMessage({
                            replyToken: e.replyToken,
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
                      console.error(error);

                      await this.client.replyMessage({
                        replyToken: e.replyToken,
                        messages: [
                          {
                            type: "text",
                            text: this.errorConverter.toMessage(error),
                          },
                        ],
                      });
                      return;
                    }
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
