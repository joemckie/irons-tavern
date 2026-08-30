import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem } from '../utils/item-builders';

export const vetionAndCalvarion: ItemCategory = {
  image: formatWikiImageUrl("Vet'ion Jr. chathead", 'category'),
  items: [
    singleItem({
      name: 'Ring of the gods',
      collectionLogCategory: 'vetion_and_calvarion',
      targetDropSources: ["Calvar'ion"],
    }),
    singleItem({
      name: "Skull of Vet'ion",
      collectionLogCategory: 'vetion_and_calvarion',
      targetDropSources: ["Calvar'ion"],
    }),
    singleItem({
      name: 'Voidwaker blade',
      collectionLogCategory: 'vetion_and_calvarion',
      targetDropSources: ["Calvar'ion"],
    }),
    singleItem({
      name: "Vet'ion Jr.",
      collectionLogCategory: 'vetion_and_calvarion',
      targetDropSources: ["Calvar'ion"],
    }),
  ],
};
