import { IdService, TimeService } from "@/internal/usecase/service";
import { RealTimeService, UuidIdService } from "../../service";

export class ServiceContainer {
    public readonly idService: IdService = new UuidIdService()
    public readonly timeService: TimeService = new RealTimeService()
}