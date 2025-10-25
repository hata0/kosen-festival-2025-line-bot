import type { i18n } from "i18next";
import { ServerApiContainer } from "../api/server";
import { SpreadsheetApiContainer } from "../api/spreadsheet";
import { CommonContainer } from "../common";
import { ConfigContainer } from "../config";
import { FactoryContainer } from "../factory";
import { RepositoryContainer } from "../repository";
import { UsecaseContainer } from "../usecase";

export class AppContainer {
  private readonly common = new CommonContainer();
  private readonly config = new ConfigContainer();
  private readonly spreadsheetApi = new SpreadsheetApiContainer();
  private readonly factory = new FactoryContainer(this.common);
  private readonly repository = new RepositoryContainer(
    this.config,
    this.spreadsheetApi,
  );
  private readonly usecase = new UsecaseContainer(
    this.factory,
    this.repository,
  );

  public readonly serverApi: ServerApiContainer;

  constructor(translator: i18n) {
    this.serverApi = new ServerApiContainer(
      this.usecase,
      this.config,
      translator,
    );
  }
}
