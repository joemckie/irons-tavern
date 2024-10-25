import { RankStructure } from '@/types/rank-calculator';
import { Rank } from './enums';

export const rankStructure = {
  Standard: {
    Air: {
      name: 'Airhead',
      threshold: 0,
    },
    Pine: {
      name: 'Pine Cone',
      threshold: 1,
    },
    Water: {
      name: 'Hydro Homie',
      threshold: 3000,
    },
    Oak: {
      name: 'Big Oak',
      threshold: 9000,
    },
    Earth: {
      name: 'Down to Earth',
      threshold: 17000,
    },
    Willow: {
      name: 'Wide Willow',
      threshold: 28000,
    },
    Nature: {
      name: 'One With Nature',
      threshold: 42000,
    },
    Maple: {
      name: 'Sweet Maple',
      threshold: 59000,
    },
    Law: {
      name: 'Above the Law',
      threshold: 80000,
    },
    Yew: {
      name: 'Ancient Yew',
      threshold: 106000,
    },
    Achiever: {
      name: 'Achiever',
      threshold: 137000,
    },
    Elite: {
      name: 'Elite',
      threshold: 180000,
    },
    Diseased: {
      name: 'Diseased',
      threshold: 222000,
    },
    Blisterwood: {
      name: 'Hollow',
      threshold: 272000,
    },
  },
  'Bingo Winner': {
    'Gnome Child': {
      name: 'Bingo Winner',
      threshold: 0,
    },
  },
  Legacy: {
    Legend: {
      name: 'Legacy',
      threshold: 0,
    },
  },
  Inviter: {
    Hero: {
      name: 'Heroic',
      threshold: 0,
    },
    Warlock: {
      name: 'Warlock',
      threshold: 80000,
    },
    Dragonstone: {
      name: 'Draconic',
      threshold: 180000,
    },
  },
  Admin: {
    Defiler: {
      name: 'Defiled',
      threshold: 0,
    },
    Onyx: {
      name: 'Onyxian',
      threshold: 137000,
    },
  },
  Moderator: {
    Pure: {
      name: 'Pure',
      threshold: 0,
    },
    Zenyte: {
      name: 'Zenyte',
      threshold: 137000,
    },
  },
  'Deputy Owner': {
    'Deputy Owner': {
      name: 'Deputy Owner',
      threshold: 0,
    },
  },
  Owner: {
    Owner: {
      name: 'Owner',
      threshold: 0,
    },
  },
} satisfies Record<
  RankStructure,
  AtLeastOne<
    Record<
      Rank,
      {
        name: string;
        threshold: number;
      }
    >
  >
>;
