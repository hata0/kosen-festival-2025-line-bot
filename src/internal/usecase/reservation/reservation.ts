import { CancelReservationInput, CreateReservationInput, GetReservationByUserIdInput } from "./input";
import { GetReservationOutput } from "./output";

export interface ReservationUsecase {
  getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput>
  create(input: CreateReservationInput): Promise<void>;
  cancel(input: CancelReservationInput): Promise<void>
}
