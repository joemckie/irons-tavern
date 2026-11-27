/** @jest-environment node */

import { parseClanMemberList } from "./parse-clan-member-list";

describe("parseClanMemberList", () => {
  it("parses each member's rank and join date", () => {
    expect(
      parseClanMemberList([
        { rsn: "0bi 1 Jacobe", rank: "Knight", joinedDate: "8-Sep-2021" },
        { rsn: "1man Machine", rank: "Paladin", joinedDate: "30-Jun-2025" },
      ]),
    ).toEqual([
      { rsn: "0bi 1 Jacobe", rank: "Knight", joinDate: new Date(2021, 8, 8) },
      { rsn: "1man Machine", rank: "Paladin", joinDate: new Date(2025, 5, 30) },
    ]);
  });

  it("drops members with an unknown rank or an unparseable join date", () => {
    expect(
      parseClanMemberList([
        { rsn: "Fine", rank: "Helper", joinedDate: "1-Jan-2024" },
        { rsn: "Odd Rank", rank: "Not a rank", joinedDate: "1-Jan-2024" },
        { rsn: "Odd Date", rank: "Helper", joinedDate: "sometime" },
      ]).map(({ rsn }) => rsn),
    ).toEqual(["Fine"]);
  });

  it("throws when the export isn't a list", () => {
    expect(() => parseClanMemberList({ error: "nope" })).toThrow();
  });
});
