import { google } from "googleapis";
import { AppError, isAppErrorWithCode } from "@/internal/domain/error";
import {
  RESERVATION_ERROR_CODE,
  RESERVATION_STATUS,
  type Reservation,
  type ReservationId,
  type ReservationRepository,
} from "@/internal/domain/reservation";
import type { AppConfig } from "@/internal/infrastructure/config/app";
import { isStatusOk } from "@/pkg/spreadsheet-api";
import { SPREADSHEET_API_ERROR_CODE } from "../shared/error";
import type { SpreadsheetApiReservationMapper } from "./mapper";

export class SpreadsheetApiReservationRepository
  implements ReservationRepository
{
  private readonly sheets;

  constructor(
    private readonly config: AppConfig,
    private readonly mapper: SpreadsheetApiReservationMapper,
  ) {
    const auth = new google.auth.JWT({
      email: this.config.spreadsheetApi.spreadsheetClientEmail,
      key: this.config.spreadsheetApi.spreadsheetPrivateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
  }

  async getById(id: ReservationId): Promise<Reservation> {
    const all = await this.getAll();
    const found = all.find((r) => r.id.equals(id));
    if (!found) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }
    return found;
  }

  async getByLineUserId(lineUserId: string): Promise<Reservation> {
    const all = await this.getAll();
    const found = all.find((r) => r.lineUserId === lineUserId);
    if (!found) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }
    return found;
  }

  async countUncompleted(createdBefore?: Date): Promise<number> {
    const all = await this.getAll();

    const count = all.filter((r) => {
      // 未完了のみ対象
      const isUncompleted = r.status.value === RESERVATION_STATUS.UNCOMPLETED;

      // date が指定されていない場合は、未完了の全件を数える
      if (!createdBefore) {
        return isUncompleted;
      }

      // createdAt が date より前のものを対象
      return isUncompleted && r.createdAt < createdBefore;
    }).length;

    return count;
  }

  async create(reservation: Reservation): Promise<void> {
    // lineUserIdのユニーク制約チェック
    try {
      await this.getByLineUserId(reservation.lineUserId);
      throw new AppError(RESERVATION_ERROR_CODE.DUPLICATE);
    } catch (error) {
      if (!isAppErrorWithCode(error, RESERVATION_ERROR_CODE.NOT_FOUND)) {
        throw error;
      }
    }

    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append?hl=ja
    const res = await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [this.mapper.toModel(reservation)],
      },
    });

    if (!isStatusOk(res)) {
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED);
    }
  }

  async update(reservation: Reservation): Promise<void> {
    const all = await this.getAll();

    const rowIndex = all.findIndex((r) => r.id.equals(reservation.id));
    if (rowIndex === -1) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }

    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update?hl=ja
    const res = await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: `A${rowIndex + 1}:F${rowIndex + 1}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [this.mapper.toModel(reservation)],
      },
    });

    if (!isStatusOk(res)) {
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED);
    }
  }

  private async getAll(): Promise<Reservation[]> {
    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get?hl=ja
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A2:F",
    });

    if (!isStatusOk(res)) {
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED);
    }

    const models = res.data.values;
    if (!models) {
      throw new AppError(SPREADSHEET_API_ERROR_CODE.REQUEST_FAILED);
    }

    const reservations: Reservation[] = models.map((model) => {
      return this.mapper.toEntity(model);
    });

    return reservations;
  }
}
