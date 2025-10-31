// TODO: 値の制限を設ける。
export class GetReservationCountQuery {
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
