import type { ReservationOrder } from "./reservation-order";

// TODO: limitとpageには値の制限があるので、後で改善する
export class GetReservationListInput {
  constructor(
    public readonly limit: number,
    public readonly page: number,
    public readonly order: ReservationOrder,
  ) {}
}
