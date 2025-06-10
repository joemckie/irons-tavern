import { estimatedHoursToComplete6Jads } from '@/app/rank-calculator/config/efficiency-rates';
import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { combatAchievementItem, singleItem } from '../utils/item-builders';

export const tzHaar: ItemCategory = {
  image: formatWikiImageUrl('TzKal-Zuk', 'category'),
  items: [
    combatAchievementItem({
      name: '6 Jads',
      points: calculateXpOrTimeBasedItemPoints(estimatedHoursToComplete6Jads),
      image: formatWikiImageUrl('TzTok-Jad'),
      requiredCombatAchievements: [
        363, // https://oldschool.runescape.wiki/w/The_VI_Jad_Challenge
      ],
    }),
    singleItem({
      name: 'Jal-nib-rek',
      collectionLogCategory: 'the_inferno',
    }),
    singleItem({
      name: 'Tzrek-jad',
      collectionLogCategory: 'the_fight_caves',
    }),
  ],
};
