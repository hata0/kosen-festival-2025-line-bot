import { ReservationUsecase, ReservationUsecaseImpl } from "@/internal/usecase/reservation";
import { RepositoryContainer } from "../repository";
import { FactoryContainer } from "../factory";

export class UsecaseContainer {
    public readonly reservationUsecase: ReservationUsecase
    
    constructor(factory: FactoryContainer, repository: RepositoryContainer){
        this.reservationUsecase = new ReservationUsecaseImpl(factory.reservationFactory, repository.reservationRepository)
    }
}