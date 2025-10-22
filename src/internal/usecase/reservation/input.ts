export class GetReservationByUserIdInput {
  constructor(public readonly userId: string){}
}

export class CreateReservationInput {
  constructor(public readonly userId: string) {}
}

export class CancelReservationInput {
  constructor(public readonly userId: string) {}
}
