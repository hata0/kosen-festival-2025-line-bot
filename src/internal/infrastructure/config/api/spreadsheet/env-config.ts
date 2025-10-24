import { SpreadsheetApiConfig } from "./config";
import {env} from "cloudflare:workers"

export class EnvSpreadsheetApiConfig implements SpreadsheetApiConfig {
    public readonly spreadsheetClientEmail: string = env.SPREADSHEET_CLIENT_EMAIL;
    public readonly spreadsheetPrivateKey: string = env.SPREADSHEET_PRIVATE_KEY;
    public readonly spreadsheetId: string = env.SPREADSHEET_ID;
}