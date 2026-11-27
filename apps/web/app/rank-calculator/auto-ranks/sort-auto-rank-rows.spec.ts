import { AutoRankRow } from "./auto-rank-row";
import { sortAutoRankRows, summariseAutoRankRows } from "./sort-auto-rank-rows";

const rows: AutoRankRow[] = [
  { rsn: "Zed", skipReason: "Ambiguous" },
  { rsn: "Ranked Low", calculatedRank: "Dragon", totalPoints: 100, isRankUp: false },
  { rsn: "Alpha", skipReason: "Ambiguous" },
  { rsn: "Up Low", calculatedRank: "Rune", totalPoints: 50, isRankUp: true },
  { rsn: "No Log", skipReason: "Missing collection log" },
  { rsn: "Broken", skipReason: "Error" },
  { rsn: "Up High", calculatedRank: "Expert", totalPoints: 500, isRankUp: true },
  { rsn: "Ranked High", calculatedRank: "Knight", totalPoints: 900, isRankUp: false },
];

describe("sortAutoRankRows", () => {
  it("orders rank-ups, then ranked, then skipped by reason", () => {
    expect(sortAutoRankRows(rows).map(({ rsn }) => rsn)).toEqual([
      "Up High",
      "Up Low",
      "Ranked High",
      "Ranked Low",
      "No Log",
      "Alpha",
      "Zed",
      "Broken",
    ]);
  });

  it("doesn't mutate the input", () => {
    const copy = [...rows];

    sortAutoRankRows(rows);

    expect(rows).toEqual(copy);
  });
});

describe("summariseAutoRankRows", () => {
  it("counts each outcome", () => {
    expect(summariseAutoRankRows(rows)).toEqual({
      "Rank up": 2,
      Ranked: 2,
      "Missing collection log": 1,
      "Missing Temple stats": 0,
      "Missing join date": 0,
      Ambiguous: 2,
      "Non-standard structure": 0,
      "Missing WikiSync": 0,
      "Staff / non-standard rank": 0,
      Error: 1,
    });
  });
});
