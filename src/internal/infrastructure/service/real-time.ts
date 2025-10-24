import { TimeService } from "@/internal/usecase/service";

export class RealTimeService implements TimeService {
    now(): Date {
        return new Date()
    }
}