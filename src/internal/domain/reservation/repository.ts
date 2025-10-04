import { Reservation } from "./reservation";

export interface ReservationRepository {
  create(reservation: Reservation): Promise<void>;
}
