import { ReservationFactory, ReservationId, ReservationRepository, ReservationStatus } from "@/internal/domain/reservation";
import { ReservationUsecase } from "./reservation";
import { GetReservationOutput, GetReservationUncompletedCountOutput } from "./output";
import { UpdateReservationInput, CreateReservationInput, GetReservationByLineUserIdInput, GetReservationUncompletedCountInput } from "./input";

export class ReservationUsecaseImpl implements ReservationUsecase {
  constructor(
    private readonly reservationFactory: ReservationFactory,
    private readonly reservationRepository: ReservationRepository,
  ) {}
  
  async getByLineUserId(input: GetReservationByLineUserIdInput): Promise<GetReservationOutput> {
    const reservation = await this.reservationRepository.getByLineUserId(input.lineUserId)

    return new GetReservationOutput(
      reservation.id.toString(),
      reservation.lineUserId,
      reservation.confirmationCode,
      reservation.status.value,
      reservation.createdAt
    )
  }

  async getUncompletedCount(input: GetReservationUncompletedCountInput): Promise<GetReservationUncompletedCountOutput> {
    const count = await this.reservationRepository.countUncompleted(input.createdBefore)
    return new GetReservationUncompletedCountOutput(count)
  }

  async create(
    input: CreateReservationInput
  ): Promise<void> {
    const reservation = this.reservationFactory.create(input.lineUserId)

    await this.reservationRepository.create(reservation);
  }

  async update(input: UpdateReservationInput): Promise<void> {
    const reservation = await this.reservationRepository.getById(new ReservationId(input.id))

    const updatedReservation = reservation.update(new ReservationStatus(input.status))

    await this.reservationRepository.update(updatedReservation)
  }
}