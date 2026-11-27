/** @jest-environment node */

import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import {
  collectionLogItemNamesFixture,
  groupCollectionLogFixture,
  groupMemberInfoFixture,
} from "@/mocks/temple-group";
import { generateCollectionLogCategoryList } from "@/app/rank-calculator/data-sources/fetch-player-details/fetch-temple-collection-log";
import { fetchTempleGroupData } from "./fetch-temple-group-data";

const memberInfoUrl = "https://templeosrs.com/api/group_member_info.php";
const collectionLogUrl = "https://templeosrs.com/api/collection-log/group_collection_log.php";
const itemNamesUrl = "https://templeosrs.com/api/collection-log/items.php";

function useDefaultHandlers() {
  server.use(
    http.get(memberInfoUrl, () => HttpResponse.json(groupMemberInfoFixture)),
    http.get(collectionLogUrl, () => HttpResponse.json(groupCollectionLogFixture)),
    http.get(itemNamesUrl, () => HttpResponse.json(collectionLogItemNamesFixture)),
  );
}

describe("fetchTempleGroupData", () => {
  it("requests the filtered categories", async () => {
    const seen: URLSearchParams[] = [];

    useDefaultHandlers();
    server.use(
      http.get(collectionLogUrl, ({ request }) => {
        seen.push(new URL(request.url).searchParams);

        return HttpResponse.json(groupCollectionLogFixture);
      }),
    );

    await fetchTempleGroupData();

    expect(seen).toHaveLength(1);
    expect(seen[0].get("categories")).toBe([...generateCollectionLogCategoryList()].join(","));
    expect(seen[0].get("includecount")).toBe("1");
    expect(seen[0].get("group")).toBe("1234");
  });

  it("requests member info with details, skills and bosses", async () => {
    const seen: URLSearchParams[] = [];

    useDefaultHandlers();
    server.use(
      http.get(memberInfoUrl, ({ request }) => {
        seen.push(new URL(request.url).searchParams);

        return HttpResponse.json(groupMemberInfoFixture);
      }),
    );

    await fetchTempleGroupData();

    expect(Object.fromEntries(seen[0])).toEqual({
      id: "1234",
      details: "1",
      skills: "1",
      bosses: "1",
    });
  });

  it("returns members, collection log and item names", async () => {
    useDefaultHandlers();

    const result = await fetchTempleGroupData();

    expect(Object.keys(result.members)).toEqual([
      "Iron Tyson",
      "Uim Fixture",
      "No Clog",
      "Lvl Three",
    ]);
    expect(result.members["Iron Tyson"]).toMatchObject({
      clog_synced: true,
      primary_ehp: "Ehp_im",
      primary_ehb: "Ehb_im",
      skills: { Overall_level: 2303, Ehp_im: 1556.6675 },
      bosses: { Collections: 917, "TzKal-Zuk": 0, Ehb_im: 649.0079 },
    });
    expect(result.collectionLog.total_collections_available).toBe(1738);
    expect(result.collectionLog.members.map(({ player }) => player)).toEqual([
      "Iron Tyson",
      "Uim Fixture",
      "Lvl Three",
    ]);
    expect(result.collectionLog.members[0].items).toEqual(
      groupCollectionLogFixture.data.members[0].items,
    );
    expect(result.itemNames).toEqual(collectionLogItemNamesFixture.items);
  });

  it("treats a member's empty items array as no items", async () => {
    useDefaultHandlers();
    server.use(
      http.get(collectionLogUrl, () =>
        HttpResponse.json({
          data: {
            ...groupCollectionLogFixture.data,
            members: [{ ...groupCollectionLogFixture.data.members[0], items: [] }],
          },
        }),
      ),
    );

    const { collectionLog } = await fetchTempleGroupData();

    expect(collectionLog.members[0].items).toEqual({});
  });

  it("drops a malformed member instead of failing the whole group", async () => {
    useDefaultHandlers();
    server.use(
      http.get(memberInfoUrl, () =>
        HttpResponse.json({
          data: {
            memberlist: {
              ...groupMemberInfoFixture.data.memberlist,
              "No Clog": { ...groupMemberInfoFixture.data.memberlist["No Clog"], skills: null },
            },
          },
        }),
      ),
      http.get(collectionLogUrl, () =>
        HttpResponse.json({
          data: {
            ...groupCollectionLogFixture.data,
            members: [
              ...groupCollectionLogFixture.data.members,
              { player: "Broken", items: { "6570": "lots" } },
            ],
          },
        }),
      ),
    );

    const result = await fetchTempleGroupData();

    expect(Object.keys(result.members)).toEqual(["Iron Tyson", "Uim Fixture", "Lvl Three"]);
    expect(result.collectionLog.members.map(({ player }) => player)).toEqual([
      "Iron Tyson",
      "Uim Fixture",
      "Lvl Three",
    ]);
  });

  it.each([memberInfoUrl, collectionLogUrl, itemNamesUrl])(
    "throws when a request fails (%s)",
    async (url) => {
      useDefaultHandlers();
      server.use(http.get(url, () => HttpResponse.error()));

      await expect(fetchTempleGroupData()).rejects.toThrow();
    },
  );

  it("throws when a request returns a non-OK status", async () => {
    useDefaultHandlers();
    server.use(http.get(collectionLogUrl, () => new HttpResponse(null, { status: 503 })));

    await expect(fetchTempleGroupData()).rejects.toThrow();
  });

  it("throws when a response doesn't match the schema", async () => {
    useDefaultHandlers();
    server.use(http.get(collectionLogUrl, () => HttpResponse.json({ error: "Group not found" })));

    await expect(fetchTempleGroupData()).rejects.toThrow();
  });
});
