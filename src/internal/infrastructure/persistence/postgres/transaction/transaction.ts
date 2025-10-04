import { Pool } from "pg";
import { PostgresReservationRepository } from "../reservation";
import {
  TransactionManager,
  TransactionRepositories,
} from "@/internal/domain/transaction";

export class PostgresTransactionManager implements TransactionManager {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async do<T>(
    fn: (txRepos: TransactionRepositories) => Promise<T>
  ): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const txRepos = new PostgresTransactionRepositories(
        new PostgresReservationRepository(client)
      );
      const result = await fn(txRepos);
      await client.query("COMMIT");
      return result;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
}

export class PostgresTransactionRepositories
  implements TransactionRepositories
{
  public readonly reservation: PostgresReservationRepository;

  constructor(reservation: PostgresReservationRepository) {
    this.reservation = reservation;
  }
}
