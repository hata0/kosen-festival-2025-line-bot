import { EnvServerApiConfig, type ServerApiConfig } from "../api/server";
import type { SpreadsheetApiConfig } from "../api/spreadsheet";
import { EnvSpreadsheetApiConfig } from "../api/spreadsheet/env-config";
import type { AppConfig } from "./config";

export class EnvAppConfig implements AppConfig {
  public readonly serverApi: ServerApiConfig = new EnvServerApiConfig();
  public readonly spreadsheetApi: SpreadsheetApiConfig =
    new EnvSpreadsheetApiConfig();
}
