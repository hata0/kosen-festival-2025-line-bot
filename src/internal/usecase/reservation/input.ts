import { UserId } from "@/internal/domain/user";

export class CreateReservationInput {
  public readonly userId: UserId;

  constructor(userId: string) {
    this.userId = new UserId(userId);
  }
}
