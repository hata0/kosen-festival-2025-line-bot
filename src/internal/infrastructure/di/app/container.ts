import { ConfigContainer } from "../config";
import { ServerApiContainer } from "../api/server";
import { UsecaseContainer } from "../usecase";

export class AppContainer {
  private readonly usecase = new UsecaseContainer()
  private readonly config = new ConfigContainer()

  public readonly serverApi = new ServerApiContainer(this.usecase, this.config)
}