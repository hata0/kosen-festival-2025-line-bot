import { MockServerApiConfig, ServerApiConfig } from "../api/server";
import { AppConfig } from "./config";

export class MockAppConfig implements AppConfig {
    public readonly serverApi: ServerApiConfig = new MockServerApiConfig();
}