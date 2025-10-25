import type { ReservationId } from "./id";
import type { ReservationStatus } from "./reservation-status";

export class Reservation {
  constructor(
    public readonly id: ReservationId,
    public readonly lineUserId: string,
    public readonly confirmationCode: string,
    public readonly status: ReservationStatus,
    public readonly createdAt: Date,
  ) {}

  update(status: ReservationStatus): Reservation {
    return new Reservation(
      this.id,
      this.lineUserId,
      this.confirmationCode,
      this.status.transitionTo(status),
      this.createdAt,
    );
  }

  equals(other: Reservation): boolean {
    return this.id.equals(other.id);
  }
}
