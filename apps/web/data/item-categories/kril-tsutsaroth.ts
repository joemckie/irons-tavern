import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const krilTsutsaroth: ItemCategory = {
  image: formatWikiImageUrl("K'ril Tsutsaroth chathead", 'category'),
  items: [
    singleItem({
      name: 'Steam battlestaff',
      collectionLogCategory: 'kril_tsutsaroth',
    }),
    singleItem({
      name: 'Zamorakian spear',
      collectionLogCategory: 'kril_tsutsaroth',
      targetDropSources: ["K'ril Tsutsaroth"],
    }),
    singleItem({
      name: 'Staff of the dead',
      collectionLogCategory: 'kril_tsutsaroth',
    }),
    singleItem({
      name: 'Zamorak hilt',
      collectionLogCategory: 'kril_tsutsaroth',
    }),
    singleItem({
      name: "Pet k'ril tsutsaroth",
      image: formatWikiImageUrl("K'ril Tsutsaroth Jr. chathead"),
      collectionLogCategory: 'kril_tsutsaroth',
    }),
  ],
};
