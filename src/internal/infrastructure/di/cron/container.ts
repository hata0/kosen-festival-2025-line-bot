import { type CronHandler, CronHandlerImpl } from "../../cron";
import type { ConfigContainer } from "../config";
import type { RepositoryContainer } from "../repository";

export class CronContainer {
  public readonly cronHandler: CronHandler;

  constructor(repository: RepositoryContainer, config: ConfigContainer) {
    this.cronHandler = new CronHandlerImpl(
      repository.reservationRepository,
      config.appConfig,
    );
  }
}
