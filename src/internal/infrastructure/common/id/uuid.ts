import { Id } from "@/internal/domain/common";
import {randomUUID} from "crypto"

export class Uuid implements Id {
    generate(): string {
        return randomUUID()
    }
}