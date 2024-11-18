import 'server-only';
import { APIMessage, Routes } from 'discord-api-types/v10';
import { discordBotClient } from '@/discord';

export async function sendDiscordMessage(
  message: Partial<APIMessage>,
  channelId: string,
): Promise<APIMessage> {
  const response = await discordBotClient.post(
    Routes.channelMessages(channelId),
    { body: message },
  );

  return response as APIMessage;
}
