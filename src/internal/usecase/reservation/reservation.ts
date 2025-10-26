import type {
  CreateReservationInput,
  DeleteReservationInput,
  GetReservationByLineUserIdInput,
  GetReservationCountInput,
  UpdateReservationInput,
} from "./input";
import type { GetReservationCountOutput, GetReservationOutput } from "./output";

export interface ReservationUsecase {
  getByLineUserId(
    input: GetReservationByLineUserIdInput,
  ): Promise<GetReservationOutput>;
  getCount(input: GetReservationCountInput): Promise<GetReservationCountOutput>;
  create(input: CreateReservationInput): Promise<void>;
  update(input: UpdateReservationInput): Promise<void>;
  delete(input: DeleteReservationInput): Promise<void>;
}
