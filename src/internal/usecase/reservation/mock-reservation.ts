import { CancelReservationInput, CreateReservationInput, GetReservationByUserIdInput } from "./input";
import { GetReservationOutput } from "./output";
import { ReservationUsecase } from "./reservation";

export class MockReservationInteractor implements ReservationUsecase {
    async getByUserId(input: GetReservationByUserIdInput): Promise<GetReservationOutput> {
        return new GetReservationOutput(new Date())
    }

    async create(input: CreateReservationInput): Promise<void> {
        console.log(input)
    }

    async cancel(input: CancelReservationInput): Promise<void> {
    }
}