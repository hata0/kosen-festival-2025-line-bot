import { Randomizer } from "@/internal/domain/common"
import {randomInt as cryptoRandomInt} from "crypto"

export class RandomizerImpl implements Randomizer {
    randomInt(min: number, max: number): number {
        return cryptoRandomInt(min, max)
    }
}