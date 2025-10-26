import type { Reservation } from "./reservation";

export interface ReservationService {
  isExists(reservation: Reservation): Promise<boolean>;
}
