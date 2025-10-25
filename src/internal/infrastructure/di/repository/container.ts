import type { ReservationRepository } from "@/internal/domain/reservation";
import { SpreadsheetApiReservationRepository } from "../../api/spreadsheet/reservation";
import type { SpreadsheetApiContainer } from "../api/spreadsheet";
import type { ConfigContainer } from "../config";

export class RepositoryContainer {
  public readonly reservationRepository: ReservationRepository;

  constructor(
    config: ConfigContainer,
    spreadsheetApi: SpreadsheetApiContainer,
  ) {
    this.reservationRepository = new SpreadsheetApiReservationRepository(
      config.appConfig,
      spreadsheetApi.reservationMapper,
    );
  }
}
