import { AppError } from "@/internal/domain/error";
import {
  GetReservationCountQuery,
  RESERVATION_ERROR_CODE,
  type Reservation,
  type ReservationFactory,
  ReservationId,
  type ReservationRepository,
  type ReservationService,
} from "@/internal/domain/reservation";
import type {
  CreateReservationInput,
  GetReservationCountInput,
  UpdateReservationInput,
} from "./input";
import {
  CreateReservationOutput,
  GetReservationCountOutput,
  ReservationOutput,
} from "./output";
import type { ReservationUsecase } from "./reservation";

export class ReservationUsecaseImpl implements ReservationUsecase {
  constructor(
    private readonly reservationFactory: ReservationFactory,
    private readonly reservationRepository: ReservationRepository,
    private readonly reservationService: ReservationService,
  ) {}

  async getById(id: string): Promise<ReservationOutput> {
    const reservation = await this.reservationRepository.getById(
      new ReservationId(id),
    );
    return this.mapToReservationOutput(reservation);
  }

  async getByLineUserId(lineUserId: string): Promise<ReservationOutput> {
    const reservation =
      await this.reservationRepository.getByLineUserId(lineUserId);
    return this.mapToReservationOutput(reservation);
  }

  private mapToReservationOutput(reservation: Reservation): ReservationOutput {
    return new ReservationOutput(
      reservation.id.toString(),
      reservation.lineUserId,
      reservation.confirmationCode,
      reservation.createdAt,
    );
  }

  async getCount(
    input: GetReservationCountInput,
  ): Promise<GetReservationCountOutput> {
    const count = await this.reservationRepository.getCount(
      new GetReservationCountQuery({
        createdAtFrom: input.createdAtFrom,
        createdAtTo: input.createdAtTo,
      }),
    );
    return new GetReservationCountOutput(count);
  }

  async create(
    input: CreateReservationInput,
  ): Promise<CreateReservationOutput> {
    const reservation = this.reservationFactory.create(input.lineUserId);

    const isExists = await this.reservationService.isExists(reservation);

    if (isExists) {
      throw new AppError(RESERVATION_ERROR_CODE.DUPLICATE);
    }

    await this.reservationRepository.create(reservation);

    return new CreateReservationOutput(reservation.id.toString());
  }

  async update(input: UpdateReservationInput): Promise<void> {
    const reservation = await this.reservationRepository.getById(
      new ReservationId(input.id),
    );

    await this.reservationRepository.update(reservation);
  }

  async delete(id: string): Promise<void> {
    await this.reservationRepository.delete(new ReservationId(id));
  }
}
