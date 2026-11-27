import { AutoRankRow, SkipReason } from "./auto-rank-row";

export type AutoRankOutcome = "Rank up" | "Ranked" | SkipReason;

function getAutoRankOutcome({ skipReason, isRankUp }: AutoRankRow): AutoRankOutcome {
  if (skipReason) {
    return skipReason;
  }

  return isRankUp ? "Rank up" : "Ranked";
}

const outcomeOrder: AutoRankOutcome[] = ["Rank up", "Ranked", ...SkipReason.options];

/**
 * Rank-ups first, then other ranked rows (both by total points, highest first),
 * then skipped rows grouped by reason, each group by RSN.
 */
export function sortAutoRankRows(rows: AutoRankRow[]): AutoRankRow[] {
  return rows.toSorted((a, b) => {
    const outcomeDifference =
      outcomeOrder.indexOf(getAutoRankOutcome(a)) - outcomeOrder.indexOf(getAutoRankOutcome(b));

    if (outcomeDifference !== 0) {
      return outcomeDifference;
    }

    if (!a.skipReason) {
      return (b.totalPoints ?? 0) - (a.totalPoints ?? 0);
    }

    return a.rsn.localeCompare(b.rsn);
  });
}

export function summariseAutoRankRows(rows: AutoRankRow[]): Record<AutoRankOutcome, number> {
  return rows.reduce(
    (acc, row) => {
      acc[getAutoRankOutcome(row)]++;

      return acc;
    },
    Object.fromEntries(outcomeOrder.map((outcome) => [outcome, 0])) as Record<
      AutoRankOutcome,
      number
    >,
  );
}
