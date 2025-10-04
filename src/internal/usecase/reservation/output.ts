import { ReservationId } from "@/internal/domain/reservation";

export class CreateReservationOutput {
  public readonly id: string;

  constructor(id: ReservationId) {
    this.id = id.toString();
  }
}
