// TODO: 値の制限を設ける。GetReservationCountQueryImplにして、インターフェースを用意すべき
export class GetReservationCountQuery {
  constructor(
    public readonly createdAtFrom?: Date,
    public readonly createdAtTo?: Date,
  ) {}
}
