import { PoolClient } from "pg";
import { ReservationMapper } from "./mapper";
import {
  Reservation,
  RESERVATION_ERROR_CODES,
  ReservationRepository,
} from "@/internal/domain/reservation";
import { AppError } from "@/internal/domain/error";

export class PostgresReservationRepository implements ReservationRepository {
  private readonly client: PoolClient;

  constructor(client: PoolClient) {
    this.client = client;
  }

  public async create(reservation: Reservation): Promise<void> {
    const row = ReservationMapper.toRow(reservation);

    try {
      await this.client.query(
        `INSERT INTO reservations (id, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4)`,
        [row.id, row.userId, row.createdAt, row.updatedAt]
      );
    } catch (e: unknown) {
      if (e instanceof Error && "code" in e && e.code === "23505") {
        throw new AppError(RESERVATION_ERROR_CODES.DUPLICATE, e);
      }
      throw e;
    }
  }
}
