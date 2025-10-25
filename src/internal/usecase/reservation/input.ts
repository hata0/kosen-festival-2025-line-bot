import type { ReservationStatusType } from "@/internal/domain/reservation";

export class GetReservationByLineUserIdInput {
  constructor(public readonly lineUserId: string) {}
}

export class GetReservationUncompletedCountInput {
  constructor(public readonly createdBefore?: Date) {}
}

export class CreateReservationInput {
  constructor(public readonly lineUserId: string) {}
}

export class UpdateReservationInput {
  constructor(
    public readonly id: string,
    public readonly status: ReservationStatusType,
  ) {}
}
