import { Reservation, ReservationId } from "@/internal/domain/reservation";
import { CreateReservationInput, GetReservationByUserIdInput } from "./input";
import { IdService, TimeService } from "../service";
import { TransactionManager } from "@/internal/domain/transaction";
import { UserId } from "@/internal/domain/user";
import { GetReservationOutput } from "./output";

export interface ReservationUsecase {
  getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput>
  create(input: CreateReservationInput): Promise<void>;
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
  
  getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput> {
    throw new Error("Method not implemented.");
  }

  public async create(
    input: CreateReservationInput
  ): Promise<void> {
    return this.txManager.do(async (txRepos) => {
      const reservationId = new ReservationId(this.idService.generate());
      const now = this.timeService.now();

      const reservation = new Reservation(
        reservationId,
        new UserId(input.userId),
        now,
        now
      );

      await txRepos.reservation.create(reservation);
    });
  }
}
