import { normaliseRsn } from "./normalise-rsn";

describe("normaliseRsn", () => {
  it.each([
    ["Iron Tyson", "iron tyson"],
    ["iron_tyson", "iron tyson"],
    ["Iron-Tyson", "iron tyson"],
    ["  IRON   tyson ", "iron tyson"],
  ])("normalises %j to %j", (input, expected) => {
    expect(normaliseRsn(input)).toBe(expected);
  });
});
