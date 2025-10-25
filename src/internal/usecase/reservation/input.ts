import { ReservationStatusType } from "@/internal/domain/reservation";

export class GetReservationByUserIdInput {
  constructor(public readonly lineUserId: string){}
}

export class GetUncompletedCountInput {
  constructor(public readonly createdBefore?: Date) {}
}

export class CreateReservationInput {
  constructor(public readonly lineUserId: string) {}
}

export class CancelReservationInput {
  constructor(
    public readonly id: string,
    public readonly status: ReservationStatusType
  ) {}
}
