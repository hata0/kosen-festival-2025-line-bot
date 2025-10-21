import { ServerApiConfig } from "./config";
import {env} from "cloudflare:workers"

export class EnvServerApiConfig implements ServerApiConfig {
    public readonly lineChannelAccessToken: string = env.LINE_CHANNEL_ACCESS_TOKEN
    public readonly lineChannelSecret: string = env.LINE_CHANNEL_SECRET
}