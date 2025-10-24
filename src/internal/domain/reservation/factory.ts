import { Reservation } from "./reservation";

export interface ReservationFactory {
    create(lineUserId: string): Reservation
}