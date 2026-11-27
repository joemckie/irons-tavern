import { ItemCategory } from "@/app/schemas/items";
import { earlyGamePlayer, endGamePlayer, midGamePlayer } from "@/mocks/misc/form-data";
import { calculatePlayerRank } from "./calculate-player-rank";

const notableItems: [string, ItemCategory][] = [
  [
    "Early game",
    {
      items: [
        { image: "", name: "Tome of fire", points: 50 },
        { image: "", name: "Zombie axe", points: 20 },
        { image: "", name: "Rift guardian", points: 10 },
      ],
    },
  ],
  [
    "Mid game",
    {
      items: [
        { image: "", name: "Abyssal bludgeon", points: 200 },
        { image: "", name: "Brimstone ring", points: 150 },
        { image: "", name: "Hydras claw", points: 500 },
      ],
    },
  ],
];

describe("calculatePlayerRank", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2026-11-27"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("calculates an early game player's rank", () => {
    expect(calculatePlayerRank(earlyGamePlayer, notableItems)).toMatchInlineSnapshot(`
{
  "rank": "Striker",
  "totalPoints": 30261,
}
`);
  });

  it("calculates a mid game player's rank", () => {
    expect(calculatePlayerRank(midGamePlayer, notableItems)).toMatchInlineSnapshot(`
{
  "rank": "Legend",
  "totalPoints": 106338,
}
`);
  });

  it("calculates an end game player's rank", () => {
    expect(calculatePlayerRank(endGamePlayer, notableItems)).toMatchInlineSnapshot(`
{
  "rank": "TzKal",
  "totalPoints": 208120,
}
`);
  });
});
