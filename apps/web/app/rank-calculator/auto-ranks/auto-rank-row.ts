import { z } from "zod";
import type { Rank } from "@/config/enums";

export const SkipReason = z.enum([
  "Missing collection log",
  "Missing Temple stats",
  "Unlinked",
  "Ambiguous",
  "Non-standard structure",
  "Not in Discord server",
  "Missing WikiSync",
  "Staff / non-standard rank",
  "Error",
]);

export type SkipReason = z.infer<typeof SkipReason>;

export interface AutoRankRow {
  /** Temple's capitalised name if available, else the Temple RSN */
  rsn: string;
  discordId?: string;
  discordName?: string;
  currentRank?: Rank;
  /** Only set when there is no skip reason */
  calculatedRank?: Rank;
  totalPoints?: number;
  isRankUp?: boolean;
  skipReason?: SkipReason;
}
