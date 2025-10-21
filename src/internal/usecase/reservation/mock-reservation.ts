import { CreateReservationInput } from "./input";
import { ReservationUsecase } from "./reservation";

export class MockReservationInteractor implements ReservationUsecase {
    async create(input: CreateReservationInput): Promise<void> {
        console.log(input)
    }
}