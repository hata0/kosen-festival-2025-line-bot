import { Reservation, ReservationId } from "@/internal/domain/reservation";
import { CreateReservationInput } from "./input";
import { CreateReservationOutput } from "./output";
import { IdService, TimeService } from "../service";
import { TransactionManager } from "@/internal/domain/transaction";

export interface ReservationUsecase {
  create(input: CreateReservationInput): Promise<CreateReservationOutput>;
}

export class ReservationInteractor implements ReservationUsecase {
  private readonly txManager: TransactionManager;
  private readonly idService: IdService;
  private readonly timeService: TimeService;

  constructor(
    txManager: TransactionManager,
    idService: IdService,
    timeService: TimeService
  ) {
    this.txManager = txManager;
    this.idService = idService;
    this.timeService = timeService;
  }

  public async create(
    input: CreateReservationInput
  ): Promise<CreateReservationOutput> {
    return this.txManager.do(async (txRepos) => {
      const reservationId = new ReservationId(this.idService.generate());
      const now = this.timeService.now();

      const reservation = new Reservation(
        reservationId,
        input.userId,
        now,
        now
      );

      await txRepos.reservation.create(reservation);

      return new CreateReservationOutput(reservationId);
    });
  }
}
