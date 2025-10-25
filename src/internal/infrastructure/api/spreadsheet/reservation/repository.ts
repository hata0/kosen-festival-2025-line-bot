import { Reservation, RESERVATION_ERROR_CODE, ReservationRepository } from "@/internal/domain/reservation";
import { AppConfig } from "@/internal/infrastructure/config/app";
import { google} from "googleapis"
import { AppError, isAppErrorWithCode } from "@/internal/domain/error";
import { isStatusOk } from "@/pkg/spreadsheet-api";
import { SPREADSHEET_API_ERROR_CODE } from "../shared";
import { SpreadsheetApiReservationMapper } from "./mapper";

export class SpreadsheetApiReservationRepository implements ReservationRepository {
  private readonly sheets;

  constructor(
    private readonly config: AppConfig,
    private readonly mapper: SpreadsheetApiReservationMapper
  ) {
    const auth = new google.auth.JWT({
      email: this.config.spreadsheetApi.spreadsheetClientEmail,
      key: this.config.spreadsheetApi.spreadsheetPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getByLineUserId(lineUserId: string): Promise<Reservation> {
    const all = await this.getAll();
    const found = all.find(r => r.lineUserId === lineUserId);
    if (!found) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }
    return found;
  }

  async create(reservation: Reservation): Promise<void> {
    // lineUserIdのユニーク制約チェック
    try {
      await this.getByLineUserId(reservation.lineUserId);
      throw new AppError(RESERVATION_ERROR_CODE.DUPLICATE);
    } catch (err) {
      if (!isAppErrorWithCode(err, RESERVATION_ERROR_CODE.NOT_FOUND)) {
        throw err
      }
    }

    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append?hl=ja
    const res = await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A:F",
      valueInputOption: 'RAW',
      requestBody: {
        values: [this.mapper.toModel(reservation)]
      }
    });

    if (!isStatusOk(res)){
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED)
    }
  }

  async update(reservation: Reservation): Promise<void> {
    const all = await this.getAll();

    const rowIndex = all.findIndex(r => r.id.equals(reservation.id));
    if (rowIndex === -1) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }

    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update?hl=ja
    const res = await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: `A${rowIndex + 1}:F${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [this.mapper.toModel(reservation)]
      }
    });

    if (!isStatusOk(res)){
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED)
    }
  }

  private async getAll(): Promise<Reservation[]> {
    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get?hl=ja
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A:F",
    });

    if (!isStatusOk(res)){
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED)
    }

    const models = res.data.values;
    if (!models) {
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED)
    }

    const reservations: Reservation[] = models.map(model => {
      return this.mapper.toEntity(model)
    });

    return reservations;
  }
}