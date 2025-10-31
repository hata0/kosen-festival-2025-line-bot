import type { ReservationOrder } from "./reservation-order";

// TODO: limitとpageには値の制限があるので、後で改善する。GetReservationListQueryImplにしてインターフェースを作るべき。
export class GetReservationListQuery {
  constructor(
    public readonly limit: number,
    public readonly page: number,
    public readonly order: ReservationOrder,
  ) {}
}
