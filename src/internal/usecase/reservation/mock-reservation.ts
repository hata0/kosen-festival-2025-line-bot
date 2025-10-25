import { UpdateReservationInput, CreateReservationInput, GetReservationByLineUserIdInput } from "./input";
import { GetReservationOutput } from "./output";
import { ReservationUsecase } from "./reservation";

export class MockReservationInteractor implements ReservationUsecase {
    async getByLineUserId(input: GetReservationByLineUserIdInput): Promise<GetReservationOutput> {
        return new GetReservationOutput(new Date())
    }

    async create(input: CreateReservationInput): Promise<void> {
        console.log(input)
    }

    async cancel(input: UpdateReservationInput): Promise<void> {
    }
}