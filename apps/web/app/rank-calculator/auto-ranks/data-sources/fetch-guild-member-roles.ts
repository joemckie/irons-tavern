import { APIGuildMember, Routes } from "discord-api-types/v10";
import { serverConstants } from "@/config/constants.server";
import { discordBotClient } from "@/discord";

const pageSize = 1000;

/**
 * Lists every guild member (requires the Server Members privileged intent).
 *
 * @returns Discord user ID → role IDs
 */
export async function fetchGuildMemberRoles(): Promise<Map<string, Set<string>>> {
  const { guildId } = serverConstants.discord;
  const roles = new Map<string, Set<string>>();
  let after: string | undefined;

  while (true) {
    const page = (await discordBotClient.get(Routes.guildMembers(guildId), {
      query: new URLSearchParams({ limit: String(pageSize), ...(after && { after }) }),
    })) as APIGuildMember[];

    for (const member of page) {
      roles.set(member.user.id, new Set(member.roles));
    }

    if (page.length < pageSize) {
      return roles;
    }

    after = page.at(-1)?.user.id;
  }
}
