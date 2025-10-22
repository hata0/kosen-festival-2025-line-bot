export class GetReservationByUserIdInput {
  constructor(public readonly userId: string){}
}

export class CreateReservationInput {
  constructor(public readonly userId: string) {}
}
