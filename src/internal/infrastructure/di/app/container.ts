import { ConfigContainer } from "../config";
import { ServerApiContainer } from "../api/server";
import { UsecaseContainer } from "../usecase";
import { RepositoryContainer } from "../repository";
import { CommonContainer } from "../common";
import { FactoryContainer } from "../factory";

export class AppContainer {
  private readonly common = new CommonContainer()
  private readonly config = new ConfigContainer()
  private readonly factory = new FactoryContainer(this.common)
  private readonly repository = new RepositoryContainer(this.config)
  private readonly usecase = new UsecaseContainer(this.factory, this.repository)

  public readonly serverApi = new ServerApiContainer(this.usecase, this.config)
}