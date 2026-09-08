import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';

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

import {
  rankSubmissionMetadataKey,
  userRankSubmissionsKey,
} from '@/config/redis';
import { redis } from '@/redis';
import { calculateMaximumAvailablePoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-available-points';
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from '@/app/rank-calculator/data-sources/fetch-dropped-item-info';
import { buildNotableItemList } from '@/app/rank-calculator/utils/build-notable-item-list';
import { calculateAchievementDiaryCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-achievement-diary-cape-points';
import { calculateMaxCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-max-cape-points';
import { calculateTzhaarCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-tzhaar-cape-points';
import { calculateBloodTorvaPoints } from '@/app/rank-calculator/utils/calculators/calculate-blood-torva-points';
import { calculateDizanasQuiverPoints } from '@/app/rank-calculator/utils/calculators/calculate-dizanas-quiver-points';
import { StandardRank, AdminRank } from '@/config/ranks';
import type { Rank } from '@/config/enums';
import type { RankSubmissionMetadata } from '@/app/schemas/rank-calculator';
import { submitRankApplication } from '@/app/rank-calculator/[player]/actions/_utilities/submit-rank-application';

export async function GET(request: NextRequest) {
  try {
    const player = z
      .string({ error: 'Player is required' })
      .transform((encodedPlayer) => decodeURIComponent(encodedPlayer))
      .parse(request.nextUrl.searchParams.get('player'));

    const discordId = z
      .string({ error: 'Discord ID is required' })
      .parse(request.nextUrl.searchParams.get('discord_id'));

    const playerDetails = await fetchPlayerDetails(player, discordId, false);

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
      rankStructure,
      tzhaarCape,
      hasBloodTorva,
      hasDizanasQuiver,
      hasAchievementDiaryCape,
      hasMaxCape,
      collectionLogBonusMultiplier,
      combatBonusMultiplier,
      notableItemsBonusMultiplier,
      skillingBonusMultiplier,
    } = playerDetails.data;

    if (!currentRank) {
      // Cannot automate ranking without knowing the existing rank
      return NextResponse.json({ success: true, message: 'No current rank' });
    }

    if (!hasThirdPartyData) {
      // Cannot automate ranking without third-party data
      return NextResponse.json({
        success: true,
        message: 'No third-party data',
      });
    }

    const parsedStandardRank = StandardRank.safeParse(currentRank);
    const parsedAdminRank = AdminRank.safeParse(currentRank);

    const isStandardRank = parsedStandardRank.success;
    const isAdminRank = parsedAdminRank.success;

    // Skip high-level staff ranks
    if (!isStandardRank && !isAdminRank) {
      return NextResponse.json({
        success: true,
        message: 'High-level staff rank',
      });
    }

    const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
    const items = Object.entries(await buildNotableItemList(dropRates));
    const scaling = calculateScaling(joinDate);
    const collectionLogSlotPoints = calculateCollectionLogSlotPoints(
      collectionLogCount,
      scaling,
    );
    const { pointsAwarded: totalCollectionLogPoints } =
      calculateCollectionLogPoints(
        collectionLogSlotPoints,
        collectionLogTotal,
        collectionLogBonusMultiplier,
        scaling,
      );
    const { pointsAwarded: totalNotableItemsPoints } =
      calculateNotableItemsPoints(
        items,
        acquiredItems,
        notableItemsBonusMultiplier,
        scaling,
      );
    const { pointsAwarded: achievementDiariesPoints } =
      calculateAchievementDiaryPoints(achievementDiaries, scaling);
    const ehpPoints = calculateEhpPoints(ehp, scaling);
    const totalLevelPoints = calculateTotalLevelPoints(totalLevel, scaling);
    const achievementDiaryCapePoints = calculateAchievementDiaryCapePoints(
      hasAchievementDiaryCape,
      scaling,
    );
    const maxCapePoints = calculateMaxCapePoints(hasMaxCape, scaling);
    const { pointsAwarded: totalSkillingPoints } = calculateSkillingPoints(
      achievementDiariesPoints,
      ehpPoints,
      totalLevelPoints,
      achievementDiaryCapePoints,
      maxCapePoints,
      skillingBonusMultiplier,
      scaling,
    );
    const ehbPoints = calculateEhbPoints(ehb, scaling);
    const combatAchievementTierPoints = calculateCombatAchievementPoints(
      combatAchievementTier,
      scaling,
    );
    const tzhaarCapePoints = calculateTzhaarCapePoints(tzhaarCape, scaling);
    const bloodTorvaPoints = calculateBloodTorvaPoints(hasBloodTorva, scaling);
    const dizanasQuiverPoints = calculateDizanasQuiverPoints(
      hasDizanasQuiver,
      scaling,
    );
    const { pointsAwarded: totalCombatPoints } = calculateCombatPoints(
      ehbPoints,
      combatAchievementTierPoints,
      tzhaarCapePoints,
      bloodTorvaPoints,
      dizanasQuiverPoints,
      combatBonusMultiplier,
      scaling,
    );
    const totalPointsAwarded = calculateTotalPoints(
      totalCollectionLogPoints,
      totalNotableItemsPoints,
      totalSkillingPoints,
      totalCombatPoints,
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

    function checkRankedUp(newRank: Rank, oldRank: Rank) {
      if (isAdminRank) {
        return (
          AdminRank.options.indexOf(newRank as AdminRank) >
          AdminRank.options.indexOf(oldRank as AdminRank)
        );
      }

      if (isStandardRank) {
        return (
          StandardRank.options.indexOf(newRank as StandardRank) >
          StandardRank.options.indexOf(oldRank as StandardRank)
        );
      }

      throw new Error('Unknown rank type, expected a standard or admin rank');
    }

    const hasRankedUp = checkRankedUp(rank, currentRank);

    if (!hasRankedUp) {
      return NextResponse.json({ success: true, message: 'Did not rank up' });
    }

    let i = 0;

    while (true) {
      const idBatch = await redis.lrange<string>(
        userRankSubmissionsKey(discordId, playerName),
        i,
        i + 100,
      );

      if (idBatch.length === 0) {
        break;
      }

      for (const submissionId of idBatch) {
        const submissionStatus = await redis.hget<
          RankSubmissionMetadata['status']
        >(rankSubmissionMetadataKey(submissionId), 'status');

        if (!submissionStatus) {
          continue;
        }

        if (submissionStatus === 'Pending') {
          // If the player has a pending rank submission, don't apply for another
          return NextResponse.json({
            success: true,
            message: 'Pending rank submission exists',
          });
        }
      }

      i += 100;
    }

    await submitRankApplication(
      discordId,
      {
        ...playerDetails.data,
        rank,
        points: totalPointsAwarded,
      },
      playerDetails.data,
      playerName,
      rank,
      totalPointsAwarded,
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false, message: String(error) });
  }
}
