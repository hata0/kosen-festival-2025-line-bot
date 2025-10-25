import { type AppConfig, EnvAppConfig } from "../../config/app";

export class ConfigContainer {
  public readonly appConfig: AppConfig = new EnvAppConfig();
}
