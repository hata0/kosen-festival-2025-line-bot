export const RESERVATION_ORDER = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
} as const;

export type ReservationOrder =
  (typeof RESERVATION_ORDER)[keyof typeof RESERVATION_ORDER];
