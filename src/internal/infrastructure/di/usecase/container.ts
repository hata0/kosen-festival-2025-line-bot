import {
  type ReservationUsecase,
  ReservationUsecaseImpl,
} from "@/internal/usecase/reservation";
import type { FactoryContainer } from "../factory";
import type { RepositoryContainer } from "../repository";

export class UsecaseContainer {
  public readonly reservationUsecase: ReservationUsecase;

  constructor(factory: FactoryContainer, repository: RepositoryContainer) {
    this.reservationUsecase = new ReservationUsecaseImpl(
      factory.reservationFactory,
      repository.reservationRepository,
    );
  }
}
