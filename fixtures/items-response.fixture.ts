import { ItemsResponse } from '@/types/rank-calculator';

export const itemsResponseFixture: ItemsResponse = {
  'Abyssal Sire': [
    {
      image: '',
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
      image: '',
      points: 60,
    },
  ],
};
