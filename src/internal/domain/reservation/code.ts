export type ReservationErrorCode =
  (typeof RESERVATION_ERROR_CODES)[keyof typeof RESERVATION_ERROR_CODES];

export const RESERVATION_ERROR_CODES = {
  DUPLICATE: "DUPLICATE_RESERVATION",
} as const;
