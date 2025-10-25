import type { Time } from "@/internal/domain/common";

export class TimeImpl implements Time {
  now(): Date {
    return new Date();
  }
}
