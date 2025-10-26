import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { Reservation, ReservationId } from "@/internal/domain/reservation";
import type { SpreadsheetApiReservationMapper } from "./mapper";

export class SpreadsheetApiReservationMapperImpl
  implements SpreadsheetApiReservationMapper
{
  toEntity(model: string[]): Reservation {
    const [id, lineUserId, confirmationCode, _createdAtDisplay, createdAtIso] =
      model;

    return new Reservation(
      new ReservationId(id),
      lineUserId,
      confirmationCode,
      new Date(createdAtIso),
    );
  }

  toModel(entity: Reservation): string[] {
    return [
      entity.id.toString(),
      entity.lineUserId,
      entity.confirmationCode,
      format(entity.createdAt, "yyyy/MM/dd HH:mm:ss.SSS", {
        in: tz("Asia/Tokyo"),
      }),
      entity.createdAt.toISOString(),
    ];
  }
}
