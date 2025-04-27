import { defaultEhbRate, ehbRates } from '@/config/efficiency-rates';
import {
  dropRateModifiers,
  itemBossNameMap,
  pointModifiers,
} from '@/config/item-point-map';
import { RequiredItem } from '@/app/schemas/items';
import Decimal from 'decimal.js-light';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import chalk from 'chalk';
import dedent from 'dedent';
import { clientConstants } from '@/config/constants.client';

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
  const pointsPerHour = 5;
  const bossName = itemBossNameMap[dropSource] ?? dropSource;
  const bossEhb = ehbRates[bossName];
  const dropRateModifier = ignoreDropRateModifier
    ? 1
    : (dropRateModifiers[dropSource] ?? 1);
  const pointModifier = pointModifiers[itemName] ?? 1;

  if (!bossEhb) {
    console.warn(
      dedent`
        ${chalk.underline.yellow(bossName)}: No EHB rate found whilst calculating "${chalk.underline.red(itemName)}". Using default of ${chalk.bold.underline('60 EHB')}.

        ${encodeURI(`${clientConstants.wiki.baseUrl}/api.php?action=ask&query=[[Dropped item::${itemName}]]|?Drop JSON|limit=1000&format=json`)}
      `,
    );
  }

  return new Decimal(1)
    .dividedBy(new Decimal(itemDropRate).times(dropRateModifier))
    .dividedBy(bossEhb ?? defaultEhbRate)
    .times(pointsPerHour)
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
      },
    ) => {
      const totalPointsForDropSources = targetDropSources.reduce(
        (sum, dropSource) =>
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
            {
              ignoreDropRateModifier,
              ignoreAmountMultiplier,
            },
          ),
        0,
      );

      // Find the mean points for all drop sources
      return acc + totalPointsForDropSources / targetDropSources.length;
    },
    0,
  );

  return Math.ceil(rawPoints);
}
