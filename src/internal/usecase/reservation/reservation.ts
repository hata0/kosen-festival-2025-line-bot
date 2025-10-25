import { CancelReservationInput, CreateReservationInput, GetReservationByUserIdInput, GetUncompletedCountInput } from "./input";
import { GetReservationOutput, GetUncompletedCountOutput } from "./output";

export interface ReservationUsecase {
  getByLineUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput>
  getUncompletedCount(input: GetUncompletedCountInput): Promise<GetUncompletedCountOutput>
  create(input: CreateReservationInput): Promise<void>;
  update(input: CancelReservationInput): Promise<void>
}
