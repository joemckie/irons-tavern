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
import { initORM, withRequestContext } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
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
import { isRankUp } from '@/app/rank-calculator/utils/is-rank-up';
import { submitRankApplication } from '@/app/_utilities/submit-rank-application';

export async function GET(request: NextRequest) {
  return withRequestContext(() => checkAutoRank(request));
}

async function checkAutoRank(request: NextRequest) {
  try {
    const player = z
      .string('Player is required')
      .transform((encodedPlayer) => decodeURIComponent(encodedPlayer))
      .parse(request.nextUrl.searchParams.get('player'));

    const discordId = z
      .string('Discord ID is required')
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

    if (rankStructure !== 'Standard') {
      return NextResponse.json({ success: true });
    }

    if (!hasThirdPartyData) {
      return NextResponse.json({ success: true });
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

    const { rank } = calculateRank(
      totalPointsAwarded,
      rankStructure,
      collectionLogTotal,
      items,
    );

    if (isRankUp(currentRank, rank)) {
      const { em } = await initORM();
      const account = await em.findOneOrFail(OSRSAccount, {
        user: discordId,
        name: player,
      });

      await submitRankApplication(
        em,
        account,
        {
          userId: discordId,
          rank,
          totalPoints: totalPointsAwarded,
        },
        playerDetails.data,
        'automatic',
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
