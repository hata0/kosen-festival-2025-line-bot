import { IdService } from "@/internal/usecase/service";

export class UuidIdService implements IdService {
    generate(): string {
        return crypto.randomUUID()
    }
}