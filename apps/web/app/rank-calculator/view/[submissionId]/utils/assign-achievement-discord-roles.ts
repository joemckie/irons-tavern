import { serverConstants } from '@/config/constants.server';
import { achievementDiscordRoles } from '@/config/discord-roles';
import { discordBotClient } from '@/discord';
import { APIGuildMember, Routes } from 'discord-api-types/v10';

export async function assignAchievementDiscordRoles(
  submitterId: string,
  achievementRoles: Record<keyof typeof achievementDiscordRoles, boolean>,
) {
  const { guildId } = serverConstants.discord;
  const { roles } = (await discordBotClient.get(
    Routes.guildMember(guildId, submitterId),
  )) as APIGuildMember;

  return Promise.all(
    Object.entries(achievementRoles).map(async ([roleName, shouldApply]) => {
      const role =
        achievementDiscordRoles[
          roleName as keyof typeof achievementDiscordRoles
        ];

      if (!shouldApply || roles.includes(role)) {
        return false;
      }

      await discordBotClient.put(
        Routes.guildMemberRole(guildId, submitterId, role),
      );

      return roleName;
    }),
  );
}
