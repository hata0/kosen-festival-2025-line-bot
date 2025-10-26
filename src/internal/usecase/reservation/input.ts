export class GetReservationByLineUserIdInput {
  constructor(public readonly lineUserId: string) {}
}

export class GetReservationCountInput {
  constructor(public readonly createdBefore?: Date) {}
}

export class CreateReservationInput {
  constructor(public readonly lineUserId: string) {}
}

export class UpdateReservationInput {
  constructor(public readonly id: string) {}
}

export class DeleteReservationInput {
  constructor(public readonly id: string) {}
}
