import type { ReservationOrder } from "./reservation-order";

// TODO: limitとpageには値の制限があるので、後で改善する。
export class GetReservationListQuery {
  public readonly limit: number;
  public readonly page: number;
  public readonly order: ReservationOrder;

  constructor(params: {
    limit: number;
    page: number;
    order: ReservationOrder;
  }) {
    this.limit = params.limit;
    this.page = params.page;
    this.order = params.order;
  }
}
