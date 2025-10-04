import { ReservationRepository } from "../reservation";

export interface TransactionManager {
  do<T>(fn: (txRepos: TransactionRepositories) => Promise<T>): Promise<T>;
}

export interface TransactionRepositories {
  reservation: ReservationRepository;
}
