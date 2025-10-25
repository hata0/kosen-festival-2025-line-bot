import { AppError } from "../error";
import { RESERVATION_ERROR_CODE } from "./code";

export const RESERVATION_STATUS = {
  UNCOMPLETED: "UNCOMPLETED",
  COMPLETED: "COMPLETED",
} as const;

export type ReservationStatusType =
  (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS];

const ALLOWED_TRANSITIONS: Record<
  ReservationStatusType,
  ReservationStatusType[]
> = {
  UNCOMPLETED: ["COMPLETED"],
  COMPLETED: [],
};

export class ReservationStatus {
  constructor(public readonly value: ReservationStatusType) {}

  canTransitionTo(newStatus: ReservationStatus): boolean {
    return ALLOWED_TRANSITIONS[this.value].includes(newStatus.value);
  }

  transitionTo(newStatus: ReservationStatus): ReservationStatus {
    if (!this.canTransitionTo(newStatus)) {
      throw new AppError(RESERVATION_ERROR_CODE.VALIDATION_ERROR);
    }
    return new ReservationStatus(newStatus.value);
  }
}
