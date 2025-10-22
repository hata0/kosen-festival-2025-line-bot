import { ReservationId } from "./id";
import { ReservationStatus } from "./reservation-status";

export class Reservation {
  constructor(
    public readonly id: ReservationId,
    public readonly lineUserId: string,
    public readonly status: ReservationStatus,
    public readonly createdAt: Date,
  ) {
  }

  public equals(other: Reservation): boolean {
    return this.id.equals(other.id);
  }
}
