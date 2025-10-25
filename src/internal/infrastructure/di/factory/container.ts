import {
  type ReservationFactory,
  ReservationFactoryImpl,
} from "@/internal/domain/reservation";
import type { CommonContainer } from "../common";

export class FactoryContainer {
  public readonly reservationFactory: ReservationFactory;

  constructor(common: CommonContainer) {
    this.reservationFactory = new ReservationFactoryImpl(
      common.id,
      common.time,
      common.randomizer,
    );
  }
}
