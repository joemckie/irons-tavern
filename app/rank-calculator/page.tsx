'use client';

import { Button, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';
import { Routes } from 'discord-api-types/v10';
import { constants } from '@/config/constants';

export default function RankCalculatorLoginPage() {
  if (!constants.discord.clientId) {
    throw new Error('No discord client ID');
  }

  if (!constants.discord.redirectUri) {
    throw new Error('Empty discord redirect URI');
  }

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      gap="6"
      direction="column"
    >
      <Heading>Irons Tavern Rank Calculator</Heading>
      <Flex direction="column" gap="4" width="330px">
        <Button size="3" asChild>
          <Link
            href={{
              protocol: 'https',
              host: constants.discord.baseUrl.replace('https://', ''),
              pathname: Routes.oauth2Authorization(),
              query: new URLSearchParams({
                response_type: 'code',
                client_id: constants.discord.clientId,
                scope: 'identify',
                prompt: 'none',
                redirect_uri: encodeURI(constants.discord.redirectUri),
              }).toString(),
            }}
          >
            Log in with Discord
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
