export class UserId {
  private readonly value: string;

  constructor(id: string) {
    this.value = id;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
