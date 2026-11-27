/** @jest-environment node */

import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { midGamePlayerFixture } from "@/mocks/wiki-sync";
import { fetchWikiSyncData } from "./fetch-wikisync-data";

const wikiSyncUrl = "https://sync.runescape.wiki/runelite/player/:player/STANDARD";
const noDelays = { retryDelaysMs: [0, 0, 0] };

function respondWith(...responses: (() => Response)[]) {
  const calls: string[] = [];

  server.use(
    http.get(wikiSyncUrl, ({ params }) => {
      calls.push(String(params.player));

      return (responses[calls.length - 1] ?? responses.at(-1)!)();
    }),
  );

  return calls;
}

describe("fetchWikiSyncData", () => {
  it("returns the parsed WikiSync data", async () => {
    const calls = respondWith(() => HttpResponse.json(midGamePlayerFixture));

    await expect(fetchWikiSyncData("Iron Tyson", noDelays)).resolves.toMatchObject({
      username: midGamePlayerFixture.username,
    });
    expect(calls).toEqual(["Iron Tyson"]);
  });

  it.each([400, 404])(
    "returns null when WikiSync has no data for the player (%i)",
    async (status) => {
      respondWith(() => new HttpResponse(null, { status }));

      await expect(fetchWikiSyncData("Iron Tyson", noDelays)).resolves.toBeNull();
    },
  );

  it("retries when rate limited", async () => {
    const calls = respondWith(
      () => new HttpResponse(null, { status: 429 }),
      () => new HttpResponse(null, { status: 429 }),
      () => HttpResponse.json(midGamePlayerFixture),
    );

    await expect(fetchWikiSyncData("Iron Tyson", noDelays)).resolves.not.toBeNull();
    expect(calls).toHaveLength(3);
  });

  it("throws when still rate limited after every retry", async () => {
    const calls = respondWith(() => new HttpResponse(null, { status: 429 }));

    await expect(fetchWikiSyncData("Iron Tyson", noDelays)).rejects.toThrow("429");
    expect(calls).toHaveLength(4);
  });

  it("throws on a server error rather than treating it as missing data", async () => {
    respondWith(() => new HttpResponse(null, { status: 503 }));

    await expect(fetchWikiSyncData("Iron Tyson", noDelays)).rejects.toThrow("503");
  });

  it("throws when the response doesn't match the schema", async () => {
    respondWith(() => HttpResponse.json({ username: "Iron Tyson" }));

    await expect(fetchWikiSyncData("Iron Tyson", noDelays)).rejects.toThrow();
  });
});
