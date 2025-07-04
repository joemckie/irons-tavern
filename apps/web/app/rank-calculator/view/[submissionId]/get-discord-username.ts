import { serverConstants } from '@/config/constants.server';
import { discordBotClient } from '@/discord';
import { APIGuildMember, Routes } from 'discord-api-types/v10';

export async function getDiscordUsername(userId: string | null) {
  if (!userId) {
    return null;
  }

  if (userId === 'System') {
    return 'System';
  }

  const data = (await discordBotClient.get(
    Routes.guildMember(serverConstants.discord.guildId, userId),
  )) as APIGuildMember;

  return data.nick ?? data.user.username;
}
