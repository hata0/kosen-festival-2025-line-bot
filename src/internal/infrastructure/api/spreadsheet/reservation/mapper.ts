import type { Reservation } from "@/internal/domain/reservation";

export interface SpreadsheetApiReservationMapper {
  toEntity(model: string[]): Reservation;
  toModel(entity: Reservation): string[];
}
