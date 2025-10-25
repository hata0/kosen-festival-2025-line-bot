import { UpdateReservationInput, CreateReservationInput, GetReservationByLineUserIdInput, GetReservationUncompletedCountInput } from "./input";
import { GetReservationOutput, GetReservationUncompletedCountOutput } from "./output";

export interface ReservationUsecase {
  getByLineUserId(input: GetReservationByLineUserIdInput): Promise<GetReservationOutput>
  getUncompletedCount(input: GetReservationUncompletedCountInput): Promise<GetReservationUncompletedCountOutput>
  create(input: CreateReservationInput): Promise<void>;
  update(input: UpdateReservationInput): Promise<void>
}
