import {
  type ReservationService,
  ReservationServiceImpl,
} from "@/internal/domain/reservation";
import type { RepositoryContainer } from "../repository";

export class ServiceContainer {
  public readonly reservationService: ReservationService;

  constructor(repository: RepositoryContainer) {
    this.reservationService = new ReservationServiceImpl(
      repository.reservationRepository,
    );
  }
}
