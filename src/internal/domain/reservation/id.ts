export class ReservationId {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: ReservationId): boolean {
    return this.value === other.value;
  }
}
