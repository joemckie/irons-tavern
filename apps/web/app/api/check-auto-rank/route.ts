import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import dedent from 'dedent';
import {
  APIDMChannel,
  ButtonStyle,
  ComponentType,
  Routes,
} from 'discord-api-types/v10';
import { NextRequest, NextResponse } from 'next/server';
import { fetchPlayerDetails } from '@/app/rank-calculator/data-sources/fetch-player-details/fetch-player-details';
import { calculateRank } from '@/app/rank-calculator/utils/calculators/calculate-rank';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import { clientConstants } from '@/config/constants.client';
import { rankUpMessagesKey } from '@/config/redis';
import { discordBotClient } from '@/discord';
import { redis } from '@/redis';
import { calculateMaximumAvailablePoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-available-points';
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from '@/app/rank-calculator/data-sources/fetch-dropped-item-info';
import { buildNotableItemList } from '@/app/rank-calculator/utils/build-notable-item-list';
import { calculateTotalPointsAwarded } from '@/app/rank-calculator/utils/calculators/calculate-total-points-awarded';

export async function GET(request: NextRequest) {
  try {
    const player = z
      .string({ required_error: 'Player is required' })
      .transform((encodedPlayer) => decodeURIComponent(encodedPlayer))
      .parse(request.nextUrl.searchParams.get('player'));

    const discordId = z
      .string({ required_error: 'Discord ID is required' })
      .parse(request.nextUrl.searchParams.get('discord_id'));

    const playerDetails = await fetchPlayerDetails(player, discordId);

    if (!playerDetails.success) {
      throw new Error('Failed to fetch player details');
    }

    const {
      collectionLogTotal,
      currentRank,
      hasThirdPartyData,
      playerName,
      rankStructure,
    } = playerDetails.data;

    if (!hasThirdPartyData) {
      return NextResponse.json({ success: true });
    }

    const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
    const items = Object.entries(await buildNotableItemList(dropRates));
    const totalPointsAwarded = calculateTotalPointsAwarded(
      playerDetails.data,
      items,
    );
    const maximumAvailablePoints = calculateMaximumAvailablePoints(
      items,
      collectionLogTotal,
    );
    const { rank } = calculateRank(
      maximumAvailablePoints,
      totalPointsAwarded,
      rankStructure,
    );

    if (rank !== currentRank) {
      const hashKey = `${discordId}:${player.toLowerCase()}`;
      const previousMessageRank = await redis.hget(rankUpMessagesKey, hashKey);

      // Send a message if the user has not been notified of this rank in the past
      if (previousMessageRank !== rank) {
        const { id: dmChannelId } = (await discordBotClient.post(
          Routes.userChannels(),
          { body: { recipient_id: discordId } },
        )) as APIDMChannel;

        await sendDiscordMessage(
          {
            content: dedent`
              Congratulations, you are eligible for the ${getRankName(rank)} rank on ${playerName}!
              
              Click the button below to go to the rank calculator and apply.
            `,
            components: [
              {
                components: [
                  {
                    label: 'Apply for rank',
                    url: `${clientConstants.publicUrl}/rank-calculator/${encodeURIComponent(player)}`,
                    style: ButtonStyle.Link,
                    type: ComponentType.Button,
                  },
                ],
                type: ComponentType.ActionRow,
              },
            ],
          },
          dmChannelId,
        );

        await redis.hset(rankUpMessagesKey, { [hashKey]: rank });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
