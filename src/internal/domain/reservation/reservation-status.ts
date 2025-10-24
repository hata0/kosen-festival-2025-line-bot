export type ReservationStatus = typeof RESERVATION_STATUS[keyof typeof RESERVATION_STATUS];

export const RESERVATION_STATUS = {
    UNCOMPLETED: "UNCOMPLETED",
    COMPLETED: "COMPLETED"
} as const