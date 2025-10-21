import { ServerApiConfig } from "./config";

export class MockServerApiConfig implements ServerApiConfig {
  public readonly lineChannelAccessToken: string = ""
  public readonly lineChannelSecret: string = ""
}