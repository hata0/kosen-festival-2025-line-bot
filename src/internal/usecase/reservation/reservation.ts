import { Reservation, ReservationId, ReservationRepository } from "@/internal/domain/reservation";
import { CancelReservationInput, CreateReservationInput, GetReservationByUserIdInput } from "./input";
import { IdService, TimeService } from "../service";
import { GetReservationOutput } from "./output";

export interface ReservationUsecase {
  getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput>
  create(input: CreateReservationInput): Promise<void>;
  cancel(input: CancelReservationInput): Promise<void>
}

export class ReservationInteractor implements ReservationUsecase {
  constructor(
    private readonly idService: IdService,
    private readonly timeService: TimeService,
    private readonly reservationRepository: ReservationRepository
  ) {}
  
  getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput> {
    throw new Error("Method not implemented.");
  }

  public async create(
    input: CreateReservationInput
  ): Promise<void> {
    const reservationId = new ReservationId(this.idService.generate());
    const now = this.timeService.now();

    const reservation = new Reservation(
      reservationId,
      input.userId,
      "UNCOMPLETED",
      now
    );

    await this.reservationRepository.create(reservation);
  }

  cancel(input: CancelReservationInput): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
