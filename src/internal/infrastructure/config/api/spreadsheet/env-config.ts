import { env } from "cloudflare:workers";
import type { SpreadsheetApiConfig } from "./config";

export class EnvSpreadsheetApiConfig implements SpreadsheetApiConfig {
  public readonly spreadsheetClientEmail: string = env.SPREADSHEET_CLIENT_EMAIL;
  public readonly spreadsheetPrivateKey: string =
    env.SPREADSHEET_PRIVATE_KEY.replace(/\\n/g, "\n");
  public readonly spreadsheetId: string = env.SPREADSHEET_ID;
}
