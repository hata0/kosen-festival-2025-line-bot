import { ConfigContainer } from "../config";
import { ServerApiContainer } from "../api/server";
import { UsecaseContainer } from "../usecase";
import { ServiceContainer } from "../service";
import { RepositoryContainer } from "../repository";

export class AppContainer {
  private readonly service = new ServiceContainer()
  private readonly config = new ConfigContainer()
  private readonly repository = new RepositoryContainer(this.config)
  private readonly usecase = new UsecaseContainer(this.service, this.repository)

  public readonly serverApi = new ServerApiContainer(this.usecase, this.config)
}