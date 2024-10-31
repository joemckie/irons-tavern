import { RankStructure } from '@/types/rank-calculator';
import { Rank } from './enums';

export const rankNames: Partial<Record<Rank, string>> = {
  Air: 'Airhead',
  Pine: 'Pine Cone',
  Water: 'Hydro Homie',
  Oak: 'Big Oak',
  Earth: 'Down to Earth',
  Willow: 'Wide Willow',
  Nature: 'One With Nature',
  Maple: 'Sweet Maple',
  Law: 'Above the Law',
  Yew: 'Ancient Yew',
  'Gnome Child': 'Bingo Winner',
  Hero: 'Heroic',
  Dragonstone: 'Draconic',
  Defiler: 'Defiled',
  Onyx: 'Onyxian',
  Legend: 'Legacy',
  Blisterwood: 'Hollow',
};

export const rankThresholds: Record<
  RankStructure,
  Partial<Record<Rank, number>>
> = {
  Standard: {
    Air: 0,
    Pine: 1,
    Water: 3000,
    Oak: 9000,
    Earth: 17000,
    Willow: 28000,
    Nature: 42000,
    Maple: 59000,
    Law: 80000,
    Yew: 106000,
    Achiever: 137000,
    Elite: 180000,
    Diseased: 222000,
    Blisterwood: 272000,
  },
  'Bingo Winner': {
    'Gnome Child': 0,
  },
  Legacy: {
    Legend: 0,
  },
  Inviter: {
    Hero: 0,
    Warlock: 80000,
    Dragonstone: 180000,
  },
  Admin: {
    Defiler: 0,
    Onyx: 137000,
  },
  Moderator: {
    Pure: 0,
    Zenyte: 137000,
  },
  'Deputy Owner': {
    'Deputy Owner': 0,
  },
  Owner: {
    Owner: 0,
  },
};
