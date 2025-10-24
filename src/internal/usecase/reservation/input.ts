export class GetReservationByUserIdInput {
  constructor(public readonly lineUserId: string){}
}

export class CreateReservationInput {
  constructor(public readonly lineUserId: string) {}
}

export class CancelReservationInput {
  constructor(public readonly lineUserId: string) {}
}
