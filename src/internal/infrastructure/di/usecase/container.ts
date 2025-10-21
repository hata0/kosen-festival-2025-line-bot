import { MockReservationInteractor, ReservationUsecase } from "@/internal/usecase/reservation";

export class UsecaseContainer {
    public readonly reservationUsecase: ReservationUsecase
    
    constructor(){
        this.reservationUsecase = new MockReservationInteractor()
    }
}