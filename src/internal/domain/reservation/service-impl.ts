import { isAppErrorWithCode } from "../error";
import { RESERVATION_ERROR_CODE } from "./code";
import type { ReservationRepository } from "./repository";
import type { Reservation } from "./reservation";
import type { ReservationService } from "./service";

export class ReservationServiceImpl implements ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async isExists(reservation: Reservation): Promise<boolean> {
    try {
      await this.reservationRepository.getByLineUserId(reservation.lineUserId);
      return true;
    } catch (error) {
      if (isAppErrorWithCode(error, RESERVATION_ERROR_CODE.NOT_FOUND)) {
        return false;
      } else {
        throw error;
      }
    }
  }
}
