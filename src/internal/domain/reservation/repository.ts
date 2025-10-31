import type { GetReservationCountQuery } from "./get-reservation-count-query";
import type { GetReservationListQuery } from "./get-reservation-list-input";
import type { ReservationId } from "./id";
import type { Reservation } from "./reservation";

export interface ReservationRepository {
  getById(id: ReservationId): Promise<Reservation>;
  getByLineUserId(lineUserId: string): Promise<Reservation>;
  getList(input: GetReservationListQuery): Promise<Reservation[]>;
  getCount(input: GetReservationCountQuery): Promise<number>;
  create(reservation: Reservation): Promise<void>;
  update(reservation: Reservation): Promise<void>;
  delete(id: ReservationId): Promise<void>;
}
