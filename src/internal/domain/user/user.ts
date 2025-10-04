import { UserId } from "./id";

export class User {
  public readonly id: UserId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(id: UserId, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public equals(other: User): boolean {
    return this.id.equals(other.id);
  }
}
