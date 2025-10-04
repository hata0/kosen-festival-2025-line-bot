import { Reservation } from "@/internal/domain/reservation";
import { ReservationRow } from "./row";

export class ReservationMapper {
  public static toRow(reservation: Reservation): ReservationRow {
    return new ReservationRow(
      reservation.id.toString(),
      reservation.userId.toString(),
      reservation.createdAt,
      reservation.updatedAt
    );
  }
}
