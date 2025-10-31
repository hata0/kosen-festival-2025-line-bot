export class ReservationOutput {
  constructor(
    public readonly id: string,
    public readonly lineUserId: string,
    public readonly confirmationCode: string,
    public readonly createdAt: Date,
  ) {}
}

export class GetReservationCountOutput {
  constructor(public readonly count: number) {}
}

export class CreateReservationOutput {
  constructor(public readonly id: string) {}
}
