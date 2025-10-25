import type { Id, Randomizer, Time } from "@/internal/domain/common";
import { Uuid } from "../../common/id";
import { RandomizerImpl } from "../../common/randomizer";
import { TimeImpl } from "../../common/time";

export class CommonContainer {
  public readonly id: Id = new Uuid();
  public readonly time: Time = new TimeImpl();
  public readonly randomizer: Randomizer = new RandomizerImpl();
}
