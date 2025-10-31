export class GetReservationCountInput {
  public readonly createdAtFrom?: Date;
  public readonly createdAtTo?: Date;

  constructor(
    params: {
      createdAtFrom?: Date;
      createdAtTo?: Date;
    } = {},
  ) {
    this.createdAtFrom = params.createdAtFrom;
    this.createdAtTo = params.createdAtTo;
  }
}

export class CreateReservationInput {
  constructor(public readonly lineUserId: string) {}
}

export class UpdateReservationInput {
  constructor(public readonly id: string) {}
}
