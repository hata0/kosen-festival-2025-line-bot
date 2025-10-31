export class GetReservationCountInput {
  constructor(
    public readonly createdAtFrom?: Date,
    public readonly createdAtTo?: Date,
  ) {}
}

export class CreateReservationInput {
  constructor(public readonly lineUserId: string) {}
}

export class UpdateReservationInput {
  constructor(public readonly id: string) {}
}
