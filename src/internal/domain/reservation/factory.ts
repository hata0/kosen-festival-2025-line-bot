import type { Reservation } from "./reservation";

export interface ReservationFactory {
  create(lineUserId: string): Reservation;
}
