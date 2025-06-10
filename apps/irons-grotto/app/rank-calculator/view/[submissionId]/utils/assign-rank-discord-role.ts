import { serverConstants } from '@/config/constants.server';
import { rankDiscordRoles } from '@/config/discord-roles';
import { Rank } from '@/config/enums';
import { discordBotClient } from '@/discord';
import { APIGuildMember, Routes } from 'discord-api-types/v10';

export async function assignRankDiscordRole(rank: Rank, submitterId: string) {
  const { guildId } = serverConstants.discord;
  const { roles } = (await discordBotClient.get(
    Routes.guildMember(guildId, submitterId),
  )) as APIGuildMember;

  // It's not possible to remove multiple roles in a single call,
  // so we filter the roles to avoid making 10+ requests each time
  // The current rank is excluded as it can cause race conditions when removing and adding it again.
  const appliedRankRoles = Object.entries(rankDiscordRoles).filter(
    ([rankName, roleId]) => rankName !== rank && roles.includes(roleId),
  );

  // Remove all existing rank roles
  await Promise.all([
    appliedRankRoles.map(([, roleId]) =>
      discordBotClient.delete(
        Routes.guildMemberRole(guildId, submitterId, roleId),
      ),
    ),
  ]);

  const approvedRole = rankDiscordRoles[rank as keyof typeof rankDiscordRoles];

  // Apply the approved role if the user doesn't already have it
  if (!roles.includes(approvedRole)) {
    await discordBotClient.put(
      Routes.guildMemberRole(guildId, submitterId, approvedRole),
    );
  }
}
