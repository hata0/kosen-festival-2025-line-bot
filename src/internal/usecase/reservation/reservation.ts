import type {
  CreateReservationInput,
  GetReservationByLineUserIdInput,
  GetReservationUncompletedCountInput,
  UpdateReservationInput,
} from "./input";
import type {
  GetReservationOutput,
  GetReservationUncompletedCountOutput,
} from "./output";

export interface ReservationUsecase {
  getByLineUserId(
    input: GetReservationByLineUserIdInput,
  ): Promise<GetReservationOutput>;
  getUncompletedCount(
    input: GetReservationUncompletedCountInput,
  ): Promise<GetReservationUncompletedCountOutput>;
  create(input: CreateReservationInput): Promise<void>;
  update(input: UpdateReservationInput): Promise<void>;
}
