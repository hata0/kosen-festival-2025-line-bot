import { randomInt as cryptoRandomInt } from "node:crypto";
import type { Randomizer } from "@/internal/domain/common";

export class RandomizerImpl implements Randomizer {
  randomInt(min: number, max: number): number {
    return cryptoRandomInt(min, max);
  }
}
