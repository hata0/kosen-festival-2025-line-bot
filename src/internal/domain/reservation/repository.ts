import { ReservationId } from "./id";
import { Reservation } from "./reservation";

export interface ReservationRepository {
  getById(id: ReservationId): Promise<Reservation>
  getByLineUserId(lineUserId: string): Promise<Reservation>
  countUncompleted(createdBefore?: Date): Promise<number>
  create(reservation: Reservation): Promise<void>;
  update(reservation: Reservation): Promise<void>
}
