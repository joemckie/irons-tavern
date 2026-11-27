import type { Rank } from "@/config/enums";
import { StandardRank } from "@/config/ranks";

export function isRankUp(currentRank: Rank | undefined, newRank: Rank): boolean {
  if (!currentRank) {
    return true;
  }

  const parsedCurrentRank = StandardRank.parse(currentRank);
  const parsedNewRank = StandardRank.parse(newRank);

  return (
    StandardRank.options.indexOf(parsedNewRank) > StandardRank.options.indexOf(parsedCurrentRank)
  );
}
