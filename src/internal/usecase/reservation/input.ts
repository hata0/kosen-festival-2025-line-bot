import { UserId } from "../../domain/user/id";

export class CreateReservationInput {
  public readonly userId: UserId;

  constructor(userId: string) {
    this.userId = new UserId(userId);
  }
}
