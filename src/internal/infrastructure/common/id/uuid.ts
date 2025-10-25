import { randomUUID } from "node:crypto";
import type { Id } from "@/internal/domain/common";

export class Uuid implements Id {
  generate(): string {
    return randomUUID();
  }
}
