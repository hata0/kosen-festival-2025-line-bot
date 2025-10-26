import type { ReservationId } from "./id";

export class Reservation {
  constructor(
    public readonly id: ReservationId,
    public readonly lineUserId: string,
    public readonly confirmationCode: string,
    public readonly createdAt: Date,
  ) {}

  equals(other: Reservation): boolean {
    return this.id.equals(other.id);
  }
}
