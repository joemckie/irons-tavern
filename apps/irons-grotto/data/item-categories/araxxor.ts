import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const araxxor: ItemCategory = {
  items: [
    singleItem({
      name: 'Coagulated venom',
      collectionLogCategory: 'araxxor',
    }),
    singleItem({
      name: 'Noxious blade',
      collectionLogCategory: 'araxxor',
    }),
    singleItem({
      name: 'Noxious point',
      collectionLogCategory: 'araxxor',
    }),
    singleItem({
      name: 'Noxious pommel',
      collectionLogCategory: 'araxxor',
    }),
    singleItem({
      name: 'Araxyte fang',
      collectionLogCategory: 'araxxor',
    }),
    compoundItem({
      name: 'Amulet of rancour (s)',
      requiredItems: [
        { clogName: 'Noxious blade', ignorePoints: true },
        { clogName: 'Noxious point', ignorePoints: true },
        { clogName: 'Noxious pommel', ignorePoints: true },
        {
          clogName: 'Aranea boots',
          targetDropSources: ['Araxyte#Level 146'],
          ignorePoints: true,
        },
        { clogName: 'Araxyte head', targetDropSources: ['Araxxor'] },
        {
          clogName: 'Zenyte shard',
          targetDropSources: ['Demonic gorilla'],
          ignorePoints: true,
        },
        { clogName: 'Nid', ignorePoints: true },
      ],
      collectionLogCategories: ['araxxor', 'slayer', 'gloughs_experiments'],
    }),
    singleItem({
      name: 'Jar of venom',
      collectionLogCategory: 'araxxor',
    }),
    singleItem({
      name: 'Nid',
      collectionLogCategory: 'araxxor',
    }),
  ],
};
