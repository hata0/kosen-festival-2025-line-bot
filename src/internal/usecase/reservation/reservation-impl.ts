import { Reservation, ReservationId, ReservationRepository } from "@/internal/domain/reservation";
import { IdService, TimeService } from "../service";
import { ReservationUsecase } from "./reservation";
import { GetReservationOutput } from "./output";
import { CancelReservationInput, CreateReservationInput, GetReservationByUserIdInput } from "./input";

export class ReservationUsecaseImpl implements ReservationUsecase {
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