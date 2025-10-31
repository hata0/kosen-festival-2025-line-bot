import { google } from "googleapis";
import { AppError } from "@/internal/domain/error";
import {
  type GetReservationListInput,
  RESERVATION_ERROR_CODE,
  RESERVATION_ORDER,
  type Reservation,
  type ReservationId,
  type ReservationRepository,
} from "@/internal/domain/reservation";
import type { AppConfig } from "@/internal/infrastructure/config/app";
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

  async getList(input: GetReservationListInput): Promise<Reservation[]> {
    const all = await this.getAll();

    // createdAtでソート
    const sorted = all.sort((a, b) => {
      if (input.order === RESERVATION_ORDER.ASCENDING) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    // ページング処理
    const startIndex = (input.page - 1) * input.limit;
    const endIndex = startIndex + input.limit;

    const paginated = sorted.slice(startIndex, endIndex);

    return paginated;
  }

  async count(createdBefore?: Date): Promise<number> {
    const all = await this.getAll();

    const count = all.filter((r) => {
      // createdBeforeが指定されていない場合は、全件を数える
      if (!createdBefore) {
        return true;
      }

      // createdAtがcreatedBeforeより前のものを数える
      return r.createdAt < createdBefore;
    }).length;

    return count;
  }

  async create(reservation: Reservation): Promise<void> {
    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append?hl=ja
    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [this.mapper.toModel(reservation)],
      },
    });
  }

  async update(reservation: Reservation): Promise<void> {
    const all = await this.getAll();

    const rowIndex = all.findIndex((r) => r.id.equals(reservation.id));
    if (rowIndex === -1) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }

    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update?hl=ja
    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: `A${rowIndex + 2}:F${rowIndex + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [this.mapper.toModel(reservation)],
      },
    });
  }

  async delete(id: ReservationId): Promise<void> {
    const all = await this.getAll();

    const rowIndex = all.findIndex((r) => r.id.equals(id));
    if (rowIndex === -1) {
      throw new AppError(RESERVATION_ERROR_CODE.NOT_FOUND);
    }

    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/request?hl=ja#deletedimensionrequest
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                dimension: "ROWS",
                startIndex: rowIndex + 1,
                endIndex: rowIndex + 2,
              },
            },
          },
        ],
      },
    });
  }

  private async getAll(): Promise<Reservation[]> {
    // リファレンス
    // https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get?hl=ja
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.config.spreadsheetApi.spreadsheetId,
      range: "A2:F",
    });

    const models = res.data.values ?? [];

    const reservations: Reservation[] = models.map((model) => {
      return this.mapper.toEntity(model);
    });

    return reservations;
  }
}
