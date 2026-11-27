import { ItemCategory } from "@/app/schemas/items";
import { assertNotableItemPoints } from "./assert-notable-item-points";

const notableItems: [string, ItemCategory][] = [
  [
    "Zulrah",
    {
      items: [
        { image: "", name: "Toxic blowpipe", points: 500 },
        { image: "", name: "Serpentine visage", points: 300 },
        { image: "", name: "Magic fang", points: 300 },
      ],
    },
  ],
];

describe("assertNotableItemPoints", () => {
  it("accepts items that all have finite points", () => {
    expect(() => assertNotableItemPoints(notableItems)).not.toThrow();
  });

  it.each([
    ["a points error", { image: "", name: "Toxic blowpipe", hasPointsError: true, points: 5 }],
    ["missing points", { image: "", name: "Toxic blowpipe" }],
    ["NaN points", { image: "", name: "Toxic blowpipe", points: Number.NaN }],
  ])("throws for an item with %s", (_, item) => {
    const items = [["Zulrah", { items: [item] }]] as unknown as [string, ItemCategory][];

    expect(() => assertNotableItemPoints(items)).toThrow("Toxic blowpipe");
  });
});
