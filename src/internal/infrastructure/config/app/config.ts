import { ServerApiConfig } from "../api/server";
import { SpreadsheetApiConfig } from "../api/spreadsheet";

export interface AppConfig {
    serverApi: ServerApiConfig 
    spreadsheetApi: SpreadsheetApiConfig
}