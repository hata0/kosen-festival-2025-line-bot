import { Id, Randomizer, Time } from "../common";
import { ReservationFactory } from "./factory";
import { ReservationId } from "./id";
import { Reservation } from "./reservation";

export class ReservationFactoryImpl implements ReservationFactory {
    constructor(
        private readonly id: Id,
        private readonly time: Time,
        private readonly randomizer: Randomizer
    ) {}

    public create(lineUserId: string): Reservation {
        const reservationId = new ReservationId(this.id.generate())
        const confirmationCode = this.randomizer.randomInt(0, 9999).toString().padStart(4, '0')
        const now = this.time.now()

        return new Reservation(
      reservationId,
      lineUserId,
      confirmationCode,
      "UNCOMPLETED",
      now
    );
    }
}