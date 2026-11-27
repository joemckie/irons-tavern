import { APIGuildMember, Routes } from "discord-api-types/v10";
import { serverConstants } from "@/config/constants.server";
import { discordBotClient } from "@/discord";
import type { GuildMember } from "../auto-rank-row";

const pageSize = 1000;

/**
 * Lists every guild member (requires the Server Members privileged intent).
 */
export async function fetchGuildMembers(): Promise<GuildMember[]> {
  const { guildId } = serverConstants.discord;
  const members: GuildMember[] = [];
  let after: string | undefined;

  while (true) {
    const page = (await discordBotClient.get(Routes.guildMembers(guildId), {
      query: new URLSearchParams({ limit: String(pageSize), ...(after && { after }) }),
    })) as APIGuildMember[];

    for (const { user, nick, roles, joined_at: joinedAt } of page) {
      members.push({
        id: user.id,
        nick: nick ?? null,
        roles: new Set(roles),
        joinedAt: joinedAt ? new Date(joinedAt) : null,
      });
    }

    if (page.length < pageSize) {
      return members;
    }

    after = page.at(-1)?.user.id;
  }
}
