import { ehbRates } from '@/app/rank-calculator/config/efficiency-rates';
import {
  dropRateModifiers,
  rewardItemBossNameMap,
  pointModifiers,
  collectionLogItemBossNameMap,
  groupSizes,
} from '@/app/rank-calculator/config/item-point-map';
import { RequiredItem } from '@/app/schemas/items';
import Decimal from 'decimal.js-light';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import chalk from 'chalk';
import dedent from 'dedent';
import { clientConstants } from '@/config/constants.client';
import { pointsConfig } from '../config/points';

interface CalculatePointsForSingleDropSourceOptions {
  ignoreDropRateModifier?: boolean;
  ignoreAmountMultiplier?: boolean;
}

function calculatePointsForSingleDropSource(
  itemName: CollectionLogItemName,
  dropSource: string,
  amount: number,
  itemDropRate: number,
  {
    ignoreDropRateModifier = false,
    ignoreAmountMultiplier = false,
  }: CalculatePointsForSingleDropSourceOptions,
) {
  const bossName =
    collectionLogItemBossNameMap[itemName] ??
    rewardItemBossNameMap[dropSource] ??
    dropSource;
  const bossEhb = ehbRates[bossName];
  const dropRateModifier = ignoreDropRateModifier
    ? 1
    : (dropRateModifiers[dropSource] ?? 1);
  const pointModifier = pointModifiers[itemName] ?? 1;
  const groupSize = groupSizes[bossName] ?? 1;

  if (!bossEhb) {
    console.warn(
      dedent`
        ${chalk.underline.yellow(bossName)}: No EHB rate found whilst calculating "${chalk.underline.red(itemName)}". Returning 0 points.

        ${encodeURI(`${clientConstants.wiki.baseUrl}/api.php?action=bucket&query=bucket("dropsline").select("drop_json").where("item_name","${itemName}").run()&format=json`)}
      `,
    );

    throw new Error(`No EHB rate found for ${bossName}`);
  }

  return new Decimal(1)
    .dividedBy(new Decimal(itemDropRate).times(dropRateModifier).div(groupSize))
    .dividedBy(bossEhb)
    .times(pointsConfig.notableItemsPointsPerHour)
    .times(pointModifier)
    .times(ignoreAmountMultiplier ? 1 : amount)
    .toNumber();
}

export function calculateItemPoints(
  dropRateInfo: DroppedItemResponse,
  items: NonEmptyArray<RequiredItem>,
): number {
  const rawPoints = items.reduce(
    (
      acc,
      {
        amount,
        clogName,
        targetDropSources = Object.keys(dropRateInfo[clogName]),
        ignoreDropRateModifier,
        ignoreAmountMultiplier,
        ignorePoints,
      },
    ) => {
      const totalPointsForDropSources = targetDropSources.reduce(
        (sum, dropSource) => {
          if (ignorePoints) {
            return sum;
          }

          return (
            sum +
            calculatePointsForSingleDropSource(
              clogName,
              dropSource,
              amount,
              z
                .number({
                  required_error: `Could not find item drop rate for ${clogName}:${dropSource}`,
                })
                .parse(dropRateInfo[clogName][dropSource]),
              { ignoreDropRateModifier, ignoreAmountMultiplier },
            )
          );
        },
        0,
      );

      // Find the mean points for all drop sources
      return acc + totalPointsForDropSources / targetDropSources.length;
    },
    0,
  );

  return Math.ceil(rawPoints);
}
