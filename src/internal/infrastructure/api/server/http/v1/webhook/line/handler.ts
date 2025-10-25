import { RESERVATION_STATUS } from "@/internal/domain/reservation";
import { AppConfig } from "@/internal/infrastructure/config/app";
import { UpdateReservationInput, CreateReservationInput, GetReservationByLineUserIdInput, ReservationUsecase } from "@/internal/usecase/reservation";
import { messagingApi, validateSignature, WebhookRequestBody } from "@line/bot-sdk";
import { Context, TypedResponse } from "hono";

export interface LineWebhookHandler {
  post(c: Context): Promise<TypedResponse<null>>
}

export class LineWebhookHandlerImpl implements LineWebhookHandler {
  constructor(
    private readonly reservationUsecase: ReservationUsecase,
    private readonly config: AppConfig
  ) {}

  async post(c: Context) {
    const textBody = await c.req.text()
    const signature = c.req.header("x-line-signature")

    // 署名検証
    if(
      signature === undefined || 
      validateSignature(textBody, this.config.serverApi.lineChannelSecret, signature)
    ){
      c.json(null, 401)
    }

    const body = JSON.parse(textBody) as WebhookRequestBody

    const client = new messagingApi.MessagingApiClient({
      channelAccessToken: this.config.serverApi.lineChannelAccessToken
    });

    await Promise.all(
      body.events.map(async(e)=>{
        const userId = e.source.userId
        if(userId === undefined){
          return
        }

        switch(e.type) {
          case "message":
            switch(e.message.type){
              case "text":
                try {
                  switch(e.message.text) {
                    case "予約作成":
                      await this.reservationUsecase.create(new CreateReservationInput(userId))
          await client.replyMessage({
            replyToken: e.replyToken,
            messages: [{
              type: "text",
              text: "予約を作成しました。"
                        }]
                      })

                      return
                    case "予約情報":
                      await this.reservationUsecase.getByLineUserId(new GetReservationByLineUserIdInput(userId))
          await client.replyMessage({
            replyToken: e.replyToken,
            messages: [{
              type: "text",
              text: "予約情報を表示する"
            }]
          })

                      return
                    case "予約キャンセル":
                      const reservation = await this.reservationUsecase.getByLineUserId(new GetReservationByLineUserIdInput(userId))
          await this.reservationUsecase.update(new UpdateReservationInput(reservation.id, RESERVATION_STATUS.COMPLETED))
          await client.replyMessage({
            replyToken: e.replyToken,
            messages: [{
              type: "text",
              text: "予約をキャンセルしました。"
            }]
          })

                      return
                    default:
                      return
                  }
                } catch (error) {
                  console.log(error)
                  await client.replyMessage({
                    replyToken: e.replyToken,
                    messages: [{
                      type: "text",
                      text: "エラーが発生しました。"
                    }]
                  })
                }

                return
              default:
                return
            }
          default:
            return
        }
      })
    )

    return c.json(null, 200)
  }
}