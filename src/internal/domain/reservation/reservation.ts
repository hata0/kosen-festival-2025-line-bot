import { ReservationId } from "./id";
import { UserId } from "../user";

export class Reservation {
  public readonly id: ReservationId;
  public readonly userId: UserId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: ReservationId,
    userId: UserId,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public equals(other: Reservation): boolean {
    return this.id.equals(other.id);
  }
}
