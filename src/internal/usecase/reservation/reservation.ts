import { ReservationRepository } from "../../domain/reservation/repository";
import { IdService } from "../service/id";
import { TimeService } from "../service/time";
import { CreateReservationInput } from "./input";
import { CreateReservationOutput } from "./output";
import { Reservation } from "../../domain/reservation";
import { ReservationId } from "../../domain/reservation/id";

export interface ReservationUsecase {
  create(input: CreateReservationInput): Promise<CreateReservationOutput>;
}

export class ReservationInteractor implements ReservationUsecase {
  private readonly reservationRepository: ReservationRepository;
  private readonly idService: IdService;
  private readonly timeService: TimeService;

  constructor(
    reservationRepository: ReservationRepository,
    idService: IdService,
    timeService: TimeService
  ) {
    this.reservationRepository = reservationRepository;
    this.idService = idService;
    this.timeService = timeService;
  }

  public async create(
    input: CreateReservationInput
  ): Promise<CreateReservationOutput> {
    const reservationId = new ReservationId(this.idService.generate());
    const now = this.timeService.now();

    const reservation = new Reservation(reservationId, input.userId, now, now);

    await this.reservationRepository.create(reservation);

    return new CreateReservationOutput(reservationId);
  }
}
