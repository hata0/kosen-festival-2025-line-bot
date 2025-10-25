import { Reservation } from "./reservation";

export interface ReservationRepository {
  getByLineUserId(lineUserId: string): Promise<Reservation>
  create(reservation: Reservation): Promise<void>;
  update(reservation: Reservation): Promise<void>
}
