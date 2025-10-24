import { ReservationRepository } from "@/internal/domain/reservation";
import { SpreadsheetReservationRepository } from "../../api/spreadsheet/reservation";
import { ConfigContainer } from "../config";

export class RepositoryContainer {
    public readonly reservationRepository: ReservationRepository

    constructor(config: ConfigContainer){
        this.reservationRepository = new SpreadsheetReservationRepository(config.appConfig)
    }
}