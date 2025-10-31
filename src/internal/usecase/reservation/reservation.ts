import type {
  CreateReservationInput,
  GetReservationCountInput,
  UpdateReservationInput,
} from "./input";
import type {
  CreateReservationOutput,
  GetReservationCountOutput,
  ReservationOutput,
} from "./output";

export interface ReservationUsecase {
  getById(id: string): Promise<ReservationOutput>;
  getByLineUserId(lineUserId: string): Promise<ReservationOutput>;
  getCount(input: GetReservationCountInput): Promise<GetReservationCountOutput>;
  create(input: CreateReservationInput): Promise<CreateReservationOutput>;
  update(input: UpdateReservationInput): Promise<void>;
  delete(id: string): Promise<void>;
}
