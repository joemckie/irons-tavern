import { isValid, parse } from "date-fns";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { ClanMember } from "@/app/schemas/inactivity-checker";
import type { ClanListMember } from "../auto-rank-row";

/**
 * Parses the in-game clan export, dropping (and reporting) any member that doesn't parse,
 * so one odd entry doesn't hide everyone's join date.
 */
export function parseClanMemberList(json: unknown): ClanListMember[] {
  return z
    .array(z.unknown())
    .parse(json)
    .flatMap((entry) => {
      const result = ClanMember.safeParse(entry);
      const joinDate = result.success
        ? parse(result.data.joinedDate, "dd-MMM-yyyy", new Date())
        : null;

      if (!result.success || !joinDate || !isValid(joinDate)) {
        Sentry.captureMessage("Malformed clan export member skipped", {
          level: "warning",
          extra: { entry },
        });

        return [];
      }

      return [{ rsn: result.data.rsn, rank: result.data.rank, joinDate }];
    });
}
