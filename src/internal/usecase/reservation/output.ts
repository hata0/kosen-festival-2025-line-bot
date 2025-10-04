import { ReservationId } from "../../domain/reservation/id";

export class CreateReservationOutput {
  public readonly id: string;

  constructor(id: ReservationId) {
    this.id = id.toString();
  }
}
