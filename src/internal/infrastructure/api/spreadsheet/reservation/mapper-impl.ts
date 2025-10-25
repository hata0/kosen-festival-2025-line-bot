import { Reservation, ReservationId, ReservationStatus } from "@/internal/domain/reservation";
import { SpreadsheetApiReservationMapper } from "./mapper";
import { format } from "date-fns";
import { tz } from "@date-fns/tz";

export class SpreadsheetApiReservationMapperImpl implements SpreadsheetApiReservationMapper {
    toEntity(model: string[]): Reservation {
        const [
      id,
      lineUserId,
      confirmationCode,
      status,
      _createdAtDisplay,
      createdAtIso
    ] = model;

    return new Reservation(
      new ReservationId(id),
      lineUserId,
      confirmationCode,
      status as ReservationStatus,
      new Date(createdAtIso)
    );
    }

    toModel(entity: Reservation): string[] {
        return [
      entity.id.toString(),
      entity.lineUserId,
      entity.confirmationCode,
      entity.status,
      format(entity.createdAt, "yyyy/MM/dd HH:mm:ss.SSS", { in: tz("Asia/Tokyo") }),
      entity.createdAt.toISOString()
    ];
    }
}