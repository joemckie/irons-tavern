import { StandardRank } from "@/config/ranks";
import { isRankUp } from "./is-rank-up";
import { Rank } from "@/config/enums";

it("returns true when the new rank is higher than the current rank", () => {
  expect(isRankUp(StandardRank.enum.Expert, StandardRank.enum.Skulled)).toBe(true);
});

it("returns false when the new rank is lower than the current rank", () => {
  expect(isRankUp(StandardRank.enum.Skulled, StandardRank.enum.Expert)).toBe(false);
});

it("returns false when the new rank is the same as the current rank", () => {
  expect(isRankUp(StandardRank.enum.Expert, StandardRank.enum.Expert)).toBe(false);
});

it("throws when the left rank is not a standard rank", () => {
  expect(() => isRankUp(Rank.enum["Deputy Owner"], StandardRank.enum.Expert)).toThrow();
});

it("throws when the right rank is not a standard rank", () => {
  expect(() => isRankUp(StandardRank.enum.Expert, Rank.enum["Deputy Owner"])).toThrow();
});

it("returns true when there is no current rank", () => {
  expect(isRankUp(undefined, StandardRank.enum.Helper)).toBe(true);
});
