import { isCollectionLogItem } from '@/app/schemas/items';
import type { TempleOSRSCollectionLogCategory } from '@/app/schemas/temple-api';
import { itemList } from '@/data/item-list';

export function generateCollectionLogCategoryList() {
  return Object.values(itemList)
    .flatMap(({ items }) => items)
    .filter(isCollectionLogItem)
    .reduce(
      (acc, { collectionLogCategories }) => {
        collectionLogCategories.forEach((category) => acc.add(category), acc);

        return acc;
      },
      new Set<TempleOSRSCollectionLogCategory>([
        /*
         * the_inferno, fortis_colosseum, and the_fight_caves are added manually as they are not included
         * in the item list, and are required to determine the TzHaar capes and Dizana's quiver completion
         */
        'the_inferno',
        'the_fight_caves',
        'fortis_colosseum',
      ]),
    );
}
