import {
  type ReservationUsecase,
  ReservationUsecaseImpl,
} from "@/internal/usecase/reservation";
import type { FactoryContainer } from "../factory";
import type { RepositoryContainer } from "../repository";
import type { ServiceContainer } from "../service";

export class UsecaseContainer {
  public readonly reservationUsecase: ReservationUsecase;

  constructor(
    factory: FactoryContainer,
    repository: RepositoryContainer,
    service: ServiceContainer,
  ) {
    this.reservationUsecase = new ReservationUsecaseImpl(
      factory.reservationFactory,
      repository.reservationRepository,
      service.reservationService,
    );
  }
}
