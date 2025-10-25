import type { ServerApiConfig } from "../api/server";
import type { SpreadsheetApiConfig } from "../api/spreadsheet";

export interface AppConfig {
  serverApi: ServerApiConfig;
  spreadsheetApi: SpreadsheetApiConfig;
}
