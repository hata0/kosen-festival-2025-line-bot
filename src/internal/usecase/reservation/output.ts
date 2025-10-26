export class GetReservationOutput {
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
