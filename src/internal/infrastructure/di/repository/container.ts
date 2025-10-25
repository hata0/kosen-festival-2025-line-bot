import { ReservationRepository } from "@/internal/domain/reservation";
import { SpreadsheetApiReservationRepository } from "../../api/spreadsheet/reservation";
import { ConfigContainer } from "../config";
import { SpreadsheetApiContainer } from "../api/spreadsheet";

export class RepositoryContainer {
    public readonly reservationRepository: ReservationRepository

    constructor(config: ConfigContainer, spreadsheetApi: SpreadsheetApiContainer){
        this.reservationRepository = new SpreadsheetApiReservationRepository(config.appConfig, spreadsheetApi.reservationMapper)
    }
}