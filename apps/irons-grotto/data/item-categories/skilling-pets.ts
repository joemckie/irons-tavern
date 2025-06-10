import { petEhcRates } from '@/app/rank-calculator/config/efficiency-rates';
import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { Item, ItemCategory } from '@/app/schemas/items';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { singleItem } from '../utils/item-builders';

export const skillingPets: ItemCategory = {
  image: formatWikiImageUrl('Phoenix_detail', 'category'),
  items: Object.entries({
    'Abyssal protector': {},
    'Baby chinchompa': {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates['Baby chinchompa']),
      image: formatWikiImageUrl('Baby chinchompa (gold) chathead'),
    },
    Beaver: {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates.Beaver),
    },
    'Giant squirrel': {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates['Giant squirrel']),
    },
    Herbi: {},
    Heron: {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates.Heron),
    },
    Phoenix: {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates.Phoenix),
    },
    Quetzin: {
      targetDropSources: ["Hunters' loot sack (expert)"],
    },
    'Rift guardian': {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates['Rift guardian']),
      image: formatWikiImageUrl('Rift guardian (follower, fire)'),
    },
    'Rock golem': {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates['Rock golem']),
    },
    Rocky: {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates.Rocky),
    },
    Tangleroot: {
      points: calculateXpOrTimeBasedItemPoints(petEhcRates.Tangleroot),
    },
    'Tiny tempor': {},
  } satisfies Partial<
    Record<
      CollectionLogItemName,
      {
        points?: number;
        image?: string;
        targetDropSources?: NonEmptyArray<string>;
      }
    >
  >).map(
    ([name, { points, image = formatWikiImageUrl(name), targetDropSources }]) =>
      singleItem({
        name,
        points,
        image,
        collectionLogCategory: 'all_pets',
        targetDropSources,
      }),
  ) as NonEmptyArray<Item>,
};
