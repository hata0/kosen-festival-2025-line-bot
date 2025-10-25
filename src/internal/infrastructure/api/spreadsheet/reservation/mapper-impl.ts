import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import {
  Reservation,
  ReservationId,
  ReservationStatus,
  type ReservationStatusType,
} from "@/internal/domain/reservation";
import type { SpreadsheetApiReservationMapper } from "./mapper";

export class SpreadsheetApiReservationMapperImpl
  implements SpreadsheetApiReservationMapper
{
  toEntity(model: string[]): Reservation {
    const [
      id,
      lineUserId,
      confirmationCode,
      status,
      _createdAtDisplay,
      createdAtIso,
    ] = model;

    return new Reservation(
      new ReservationId(id),
      lineUserId,
      confirmationCode,
      new ReservationStatus(status as ReservationStatusType),
      new Date(createdAtIso),
    );
  }

  toModel(entity: Reservation): string[] {
    return [
      entity.id.toString(),
      entity.lineUserId,
      entity.confirmationCode,
      entity.status.value,
      format(entity.createdAt, "yyyy/MM/dd HH:mm:ss.SSS", {
        in: tz("Asia/Tokyo"),
      }),
      entity.createdAt.toISOString(),
    ];
  }
}
