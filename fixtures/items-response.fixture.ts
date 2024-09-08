import { ItemsResponse } from '@/types/rank-calculator';

export const itemsResponseFixture: ItemsResponse = {
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
