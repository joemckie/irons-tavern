import { ItemsResponse } from '@/types/rank-calculator';

export const itemsResponseFixture: ItemsResponse = {
  'Abyssal Sire': [
    {
      image: '',
      name: 'Unsired',
      requiredItems: [
        {
          amount: 1,
          clogName: 'Unsired',
        },
      ],
    },
  ],
  'Abyssal Sire2': [
    {
      image: '',
      name: 'Unsired2',
      requiredItems: [
        {
          amount: 1,
          clogName: 'Unsired',
        },
      ],
    },
  ],
  Zulrah: [
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
      image: '',
    },
    {
      name: 'Magic Fang',
      requiredItems: [
        {
          amount: 1,
          clogName: 'Magic Fang',
        },
      ],
      image: '',
    },
  ],
};
