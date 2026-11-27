import { z } from "zod";
import type { Rank } from "@/config/enums";

export const SkipReason = z.enum([
  "Missing collection log",
  "Missing Temple stats",
  "Missing join date",
  "Ambiguous",
  "Non-standard structure",
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
  /** Only set on calculated rows. False when Tavern Diary roles couldn't be read, so no diary bonus was applied. */
  hasDiscordRoles?: boolean;
  /** How the Discord user was found: a linked rank calculator account, or an exact server nickname */
  discordMatchedBy?: "Account" | "Nickname";
  skipReason?: SkipReason;
}

/** A member of the in-game clan export */
export interface ClanListMember {
  rsn: string;
  rank: Rank;
  joinDate: Date;
}

/** A member of the Discord server, used for Tavern Diary roles */
export interface GuildMember {
  id: string;
  /** Server nickname, which is expected to be the member's RSN */
  nick: string | null;
  roles: Set<string>;
  joinedAt: Date | null;
}
