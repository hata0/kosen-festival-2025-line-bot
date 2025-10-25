import {
  type SpreadsheetApiReservationMapper,
  SpreadsheetApiReservationMapperImpl,
} from "@/internal/infrastructure/api/spreadsheet/reservation";

export class SpreadsheetApiContainer {
  public readonly reservationMapper: SpreadsheetApiReservationMapper =
    new SpreadsheetApiReservationMapperImpl();
}
