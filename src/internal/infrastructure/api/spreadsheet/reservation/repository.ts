import { Reservation, ReservationRepository } from "@/internal/domain/reservation";
import { AppConfig } from "@/internal/infrastructure/config/app";
import { google} from "googleapis"
import {format} from "date-fns"
import { tz } from "@date-fns/tz";

export class SpreadsheetReservationRepository implements ReservationRepository {
  private readonly sheets;

  constructor(private readonly config: AppConfig) {
    const auth = new google.auth.JWT({
      email: this.config.spreadsheetApi.spreadsheetClientEmail,
      key: this.config.spreadsheetApi.spreadsheetPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  // 予約をスプレッドシートに 1 行追加
  async create(reservation: Reservation): Promise<void> {
    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append?hl=ja
    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A:E",
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          reservation.lineUserId,
          reservation.confirmationCode,
          reservation.status,
          format(reservation.createdAt, "yyyy/MM/dd HH:mm:ss.SSS", { in: tz("Asia/Tokyo") }),
          reservation.createdAt.toISOString()
        ]]
      }
    });
  }
}