import { EnvServerApiConfig, ServerApiConfig } from "../api/server";
import { AppConfig } from "./config";

export class EnvAppConfig implements AppConfig {
    public readonly serverApi: ServerApiConfig = new EnvServerApiConfig()
}