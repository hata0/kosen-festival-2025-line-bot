import { ReservationFactory, ReservationRepository } from "@/internal/domain/reservation";
import { ReservationUsecase } from "./reservation";
import { GetReservationOutput } from "./output";
import { CancelReservationInput, CreateReservationInput, GetReservationByUserIdInput } from "./input";

export class ReservationUsecaseImpl implements ReservationUsecase {
  constructor(
    private readonly reservationFactory: ReservationFactory,
    private readonly reservationRepository: ReservationRepository
  ) {}
  
  getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput> {
    throw new Error("Method not implemented.");
  }

  public async create(
    input: CreateReservationInput
  ): Promise<void> {
    const reservation = this.reservationFactory.create(input.lineUserId)

    await this.reservationRepository.create(reservation);
  }

  cancel(input: CancelReservationInput): Promise<void> {
    throw new Error("Method not implemented.");
  }
}