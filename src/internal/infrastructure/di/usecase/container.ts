import { ReservationUsecase, ReservationUsecaseImpl } from "@/internal/usecase/reservation";
import { ServiceContainer } from "../service";
import { RepositoryContainer } from "../repository";

export class UsecaseContainer {
    public readonly reservationUsecase: ReservationUsecase
    
    constructor(service: ServiceContainer, repository: RepositoryContainer){
        this.reservationUsecase = new ReservationUsecaseImpl(service.idService, service.timeService, repository.reservationRepository)
    }
}