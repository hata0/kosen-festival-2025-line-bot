import { env } from "cloudflare:workers";
import type { ServerApiConfig } from "./config";

export class EnvServerApiConfig implements ServerApiConfig {
  public readonly lineChannelAccessToken: string =
    env.LINE_CHANNEL_ACCESS_TOKEN;
  public readonly lineChannelSecret: string = env.LINE_CHANNEL_SECRET;
}
