import { AppError } from "@/internal/domain/error";
import {
  RESERVATION_ERROR_CODE,
  type ReservationFactory,
  ReservationId,
  type ReservationRepository,
  type ReservationService,
} from "@/internal/domain/reservation";
import type {
  CreateReservationInput,
  DeleteReservationInput,
  GetReservationByLineUserIdInput,
  GetReservationCountInput,
  UpdateReservationInput,
} from "./input";
import { GetReservationCountOutput, GetReservationOutput } from "./output";
import type { ReservationUsecase } from "./reservation";

export class ReservationUsecaseImpl implements ReservationUsecase {
  constructor(
    private readonly reservationFactory: ReservationFactory,
    private readonly reservationRepository: ReservationRepository,
    private readonly reservationService: ReservationService,
  ) {}

  async getByLineUserId(
    input: GetReservationByLineUserIdInput,
  ): Promise<GetReservationOutput> {
    const reservation = await this.reservationRepository.getByLineUserId(
      input.lineUserId,
    );

    return new GetReservationOutput(
      reservation.id.toString(),
      reservation.lineUserId,
      reservation.confirmationCode,
      reservation.createdAt,
    );
  }

  async getCount(
    input: GetReservationCountInput,
  ): Promise<GetReservationCountOutput> {
    const count = await this.reservationRepository.count(input.createdBefore);
    return new GetReservationCountOutput(count);
  }

  async create(input: CreateReservationInput): Promise<void> {
    const reservation = this.reservationFactory.create(input.lineUserId);

    const isExists = await this.reservationService.isExists(reservation);

    if (isExists) {
      throw new AppError(RESERVATION_ERROR_CODE.DUPLICATE);
    }

    await this.reservationRepository.create(reservation);
  }

  async update(input: UpdateReservationInput): Promise<void> {
    const reservation = await this.reservationRepository.getById(
      new ReservationId(input.id),
    );

    await this.reservationRepository.update(reservation);
  }

  async delete(input: DeleteReservationInput): Promise<void> {
    await this.reservationRepository.delete(new ReservationId(input.id));
  }
}
