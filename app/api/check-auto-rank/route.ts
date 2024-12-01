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
import { calculateAchievementDiaryPoints } from '@/app/rank-calculator/utils/calculators/calculate-achievement-diary-points';
import { calculateCollectionLogPoints } from '@/app/rank-calculator/utils/calculators/calculate-collection-log-points';
import { calculateCollectionLogSlotPoints } from '@/app/rank-calculator/utils/calculators/calculate-collection-log-slot-points';
import { calculateCombatAchievementPoints } from '@/app/rank-calculator/utils/calculators/calculate-combat-achievement-points';
import { calculateCombatPoints } from '@/app/rank-calculator/utils/calculators/calculate-combat-points';
import { calculateEhbPoints } from '@/app/rank-calculator/utils/calculators/calculate-ehb-points';
import { calculateEhpPoints } from '@/app/rank-calculator/utils/calculators/calculate-ehp-points';
import { calculateNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-notable-items-points';
import { calculateRank } from '@/app/rank-calculator/utils/calculators/calculate-rank';
import { calculateScaling } from '@/app/rank-calculator/utils/calculators/calculate-scaling';
import { calculateSkillingPoints } from '@/app/rank-calculator/utils/calculators/calculate-skilling-points';
import { calculateTotalLevelPoints } from '@/app/rank-calculator/utils/calculators/calculate-total-level-points';
import { calculateTotalPoints } from '@/app/rank-calculator/utils/calculators/calculate-total-points';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import { RankStructure } from '@/app/schemas/rank-calculator';
import { clientConstants } from '@/config/constants.client';
import { rankUpMessagesKey } from '@/config/redis';
import { discordBotClient } from '@/discord';
import { redis } from '@/redis';

export async function GET(request: NextRequest) {
  try {
    const player = z
      .string({
        required_error: 'Player is required',
      })
      .transform((encodedPlayer) => decodeURIComponent(encodedPlayer))
      .parse(request.nextUrl.searchParams.get('player'));

    const discordId = z
      .string({
        required_error: 'Discord ID is required',
      })
      .parse(request.nextUrl.searchParams.get('discord_id'));

    const playerDetails = await fetchPlayerDetails(player, discordId);

    if (!playerDetails.success) {
      throw new Error('Failed to fetch player details');
    }

    const {
      joinDate,
      collectionLogTotal,
      collectionLogCount,
      acquiredItems,
      achievementDiaries,
      ehp,
      ehb,
      totalLevel,
      combatAchievementTier,
      currentRank,
      hasThirdPartyData,
      playerName,
    } = playerDetails.data;

    if (!hasThirdPartyData) {
      return NextResponse.json({ success: true });
    }

    const scaling = calculateScaling(joinDate);
    const collectionLogSlotPoints = calculateCollectionLogSlotPoints(
      collectionLogCount,
      scaling,
    );
    const { pointsAwarded: totalCollectionLogPoints } =
      calculateCollectionLogPoints(
        collectionLogSlotPoints,
        collectionLogTotal,
        scaling,
      );
    const { pointsAwarded: totalNotableItemsPoints } =
      calculateNotableItemsPoints(acquiredItems, scaling);
    const { pointsAwarded: achievementDiariesPoints } =
      calculateAchievementDiaryPoints(achievementDiaries, scaling);
    const ehpPoints = calculateEhpPoints(ehp, scaling);
    const totalLevelPoints = calculateTotalLevelPoints(totalLevel, scaling);
    const { pointsAwarded: totalSkillingPoints } = calculateSkillingPoints(
      achievementDiariesPoints,
      ehpPoints,
      totalLevelPoints,
      scaling,
    );
    const ehbPoints = calculateEhbPoints(ehb, scaling);
    const combatAchievementTierPoints = calculateCombatAchievementPoints(
      combatAchievementTier,
      scaling,
    );
    const { pointsAwarded: totalCombatPoints } = calculateCombatPoints(
      ehbPoints,
      combatAchievementTierPoints,
      scaling,
    );
    const totalPointsAwarded = calculateTotalPoints(
      totalCollectionLogPoints,
      totalNotableItemsPoints,
      totalSkillingPoints,
      totalCombatPoints,
    );
    const { rank } = calculateRank(
      totalPointsAwarded,
      RankStructure.enum.Standard,
    );

    if (rank !== currentRank) {
      const previousMessageRank = await redis.hget(
        rankUpMessagesKey,
        player.toLowerCase(),
      );

      // Send a message if the user has not been notified of this rank in the past
      if (previousMessageRank !== rank) {
        const { id: dmChannelId } = (await discordBotClient.post(
          Routes.userChannels(),
          {
            body: {
              recipient_id: discordId,
            },
          },
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

        await redis.hset(rankUpMessagesKey, {
          [player.toLowerCase()]: rank,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
