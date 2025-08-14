import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { ItemCategory } from '@/app/schemas/items';
import { singleItem, compoundItem } from '../utils/item-builders';

export const desertTreasure2: ItemCategory = {
  image: formatWikiImageUrl('Ancient icon detail', 'category'),
  items: [
    singleItem({
      name: "Awakener's orb",
      collectionLogCategory: 'vardorvis',
    }),
    singleItem({
      name: 'Blood quartz',
      collectionLogCategory: 'vardorvis',
    }),
    singleItem({
      name: 'Ice quartz',
      collectionLogCategory: 'duke_sucellus',
    }),
    singleItem({
      name: 'Shadow quartz',
      collectionLogCategory: 'the_whisperer',
    }),
    singleItem({
      name: 'Smoke quartz',
      collectionLogCategory: 'the_leviathan',
    }),
    singleItem({
      name: 'Chromium ingot',
      collectionLogCategory: 'vardorvis',
      targetDropSources: [
        'Vardorvis',
        'The Whisperer',
        'Duke Sucellus',
        'The Leviathan',
      ],
    }),
    singleItem({
      name: 'Virtus mask',
      collectionLogCategory: 'vardorvis',
    }),
    singleItem({
      name: 'Virtus robe top',
      collectionLogCategory: 'vardorvis',
    }),
    singleItem({
      name: 'Virtus robe bottom',
      collectionLogCategory: 'vardorvis',
    }),
    compoundItem({
      name: 'Bellator ring',
      requiredItems: [
        { clogName: 'Bellator vestige' },
        { clogName: 'Warrior ring', ignorePoints: true },
      ],
      requiredLevels: {
        Magic: 85,
        Crafting: 75,
      },
      collectionLogCategories: ['the_whisperer', 'dagannoth_kings'],
    }),
    compoundItem({
      name: 'Magus ring',
      requiredItems: [
        { clogName: 'Magus vestige' },
        { clogName: 'Seers ring', ignorePoints: true },
      ],
      requiredLevels: {
        Magic: 85,
        Crafting: 75,
      },
      collectionLogCategories: ['duke_sucellus', 'dagannoth_kings'],
    }),
    compoundItem({
      name: 'Ultor ring',
      requiredItems: [
        { clogName: 'Ultor vestige' },
        { clogName: 'Berserker ring', ignorePoints: true },
      ],
      requiredLevels: {
        Magic: 85,
        Crafting: 75,
      },
      collectionLogCategories: ['vardorvis', 'dagannoth_kings'],
    }),
    compoundItem({
      name: 'Venator ring',
      requiredItems: [
        { clogName: 'Venator vestige' },
        { clogName: 'Archers ring', ignorePoints: true },
      ],
      requiredLevels: {
        Magic: 85,
        Crafting: 75,
      },
      collectionLogCategories: ['the_leviathan', 'dagannoth_kings'],
    }),
    compoundItem({
      name: 'Soulreaper axe',
      requiredItems: [
        { clogName: "Leviathan's lure" },
        { clogName: "Siren's staff" },
        { clogName: "Executioner's axe head" },
        { clogName: 'Eye of the duke' },
      ],
      requiredLevels: {
        Magic: 75,
      },
      collectionLogCategories: [
        'vardorvis',
        'the_leviathan',
        'the_whisperer',
        'duke_sucellus',
      ],
    }),
    singleItem({
      name: 'Baron',
      collectionLogCategory: 'duke_sucellus',
    }),
    singleItem({
      name: 'Butch',
      collectionLogCategory: 'vardorvis',
    }),
    singleItem({
      name: "Lil'viathan",
      collectionLogCategory: 'the_leviathan',
    }),
    singleItem({
      name: 'Wisp',
      collectionLogCategory: 'the_whisperer',
    }),
  ],
} satisfies ItemCategory;
