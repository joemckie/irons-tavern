import { serverConstants } from '@/config/constants.server';
import { discordBotClient } from '@/discord';
import { APIGuildMember, Routes } from 'discord-api-types/v10';
import * as Sentry from '@sentry/nextjs';

export async function fetchUserDiscordRoles(userId: string) {
  try {
    const {
      discord: { guildId },
    } = serverConstants;

    const { roles } = (await discordBotClient.get(
      Routes.guildMember(guildId, userId),
    )) as APIGuildMember;

    return new Set(roles);
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
