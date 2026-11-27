/** @jest-environment node */

import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { fetchGuildMembers } from "./fetch-guild-members";

const guildMembersUrl = "https://discord.com/api/v10/guilds/:guildId/members";

function buildMember(id: string, roles: string[] = [], nick: string | null = null) {
  return {
    nick,
    user: { id, username: `user-${id}`, discriminator: "0", global_name: null, avatar: null },
    roles,
    joined_at: "2024-01-01T00:00:00.000Z",
    deaf: false,
    mute: false,
    flags: 0,
  };
}

const firstPage = Array.from({ length: 1000 }, (_, i) => buildMember(String(1000 + i)));
const secondPage = [
  buildMember("3000", ["role-a", "role-b"], "Iron Tyson"),
  buildMember("3001"),
  buildMember("3002", ["role-c"]),
];

function usePagedHandler(seen: URLSearchParams[] = []) {
  server.use(
    http.get(guildMembersUrl, ({ request, params }) => {
      const searchParams = new URL(request.url).searchParams;

      seen.push(searchParams);

      if (params.guildId !== "discord-guild-id") {
        return new HttpResponse(null, { status: 404 });
      }

      switch (searchParams.get("after")) {
        case null:
          return HttpResponse.json(firstPage);
        case firstPage.at(-1)?.user.id:
          return HttpResponse.json(secondPage);
        default:
          return HttpResponse.json([]);
      }
    }),
  );
}

describe("fetchGuildMembers", () => {
  it("pages through every member", async () => {
    const seen: URLSearchParams[] = [];

    usePagedHandler(seen);

    const members = await fetchGuildMembers();

    expect(members).toHaveLength(1003);
    expect(seen.map((params) => params.get("limit"))).toEqual(["1000", "1000"]);
    expect(seen.map((params) => params.get("after"))).toEqual([null, "1999"]);
  });

  it("maps each member's roles, nickname and join date", async () => {
    usePagedHandler();

    const members = await fetchGuildMembers();

    expect(members.find(({ id }) => id === "3000")).toEqual({
      id: "3000",
      nick: "Iron Tyson",
      roles: new Set(["role-a", "role-b"]),
      joinedAt: new Date("2024-01-01T00:00:00.000Z"),
    });
    expect(members.find(({ id }) => id === "3001")).toMatchObject({ nick: null, roles: new Set() });
  });

  it("throws when Discord returns an error", async () => {
    server.use(http.get(guildMembersUrl, () => new HttpResponse(null, { status: 403 })));

    await expect(fetchGuildMembers()).rejects.toThrow();
  });
});
