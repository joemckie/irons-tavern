import { ItemsResponse } from '@/types/rank-calculator';

export const itemsResponseFixture: ItemsResponse = {
  'Abyssal Sire': {
    image: 'https://oldschool.runescape.wiki/images/Abyssal_Sire.png',
    items: [
      {
        image:
          'https://oldschool.runescape.wiki/images/Abyssal_bludgeon_detail.png?dd634',
        name: 'Abyssal Bludgeon',
        points: 60,
        requiredItems: [
          {
            amount: 1,
            clogName: 'Bludgeon axon',
          },
          {
            amount: 1,
            clogName: 'Bludgeon claw',
          },
          {
            amount: 1,
            clogName: 'Bludgeon spine',
          },
        ],
      },
    ],
  },
  Zulrah: {
    image:
      'https://oldschool.runescape.wiki/images/Zulrah_%28serpentine%29.png',
    items: [
      {
        name: 'Toxic Blowpipe',
        requiredItems: [
          {
            amount: 1,
            clogName: 'Tanzanite Fang',
            requiredLevels: [
              {
                level: 73,
                skill: 'Fletching',
              },
            ],
          },
        ],
        image:
          'https://oldschool.runescape.wiki/images/Toxic_blowpipe_detail.png?6a110',
        points: 80,
      },
      {
        name: 'Magic Fang',
        requiredItems: [
          {
            amount: 1,
            clogName: 'Magic Fang',
          },
        ],
        image:
          'https://oldschool.runescape.wiki/images/Magic_fang_detail.png?cd4e3',
        points: 60,
      },
    ],
  },
};
