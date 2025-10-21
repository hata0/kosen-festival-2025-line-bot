import { AppConfig } from "@/internal/infrastructure/config/app";
import { CreateReservationInput, ReservationUsecase } from "@/internal/usecase/reservation";
import { messagingApi, validateSignature, WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { Context, TypedResponse } from "hono";
import { match } from "ts-pattern";

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
        await match(e)
        .with({type: "message"}, async(e)=>{
          const userId = e.source.userId
          if(userId === undefined){
            return
          }

          await this.reservationUsecase.create(new CreateReservationInput(userId))

          await client.replyMessage({
            replyToken: e.replyToken,
            messages: [{
              type: "text",
              text: "予約を作成しました。"
            }]
          })
        })
        .otherwise(()=>{})
      })
    )

    return c.json(null, 200)
  }
}