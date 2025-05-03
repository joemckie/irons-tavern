import { z } from 'zod';
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

export const StandardRank = Rank.extract([
  'Air',
  'Pine',
  'Water',
  'Oak',
  'Earth',
  'Willow',
  'Nature',
  'Maple',
  'Law',
  'Yew',
  'Achiever',
  'Elite',
  'Diseased',
  'Blisterwood',
]);

export type StandardRank = z.infer<typeof StandardRank>;

/**
 * The rank proportions are used to calculate the rank thresholds as a percentage of the total points.
 */
export const rankProportions = {
  Water: 0.01,
  Oak: 0.033,
  Earth: 0.066,
  Willow: 0.111,
  Nature: 0.164,
  Maple: 0.23,
  Law: 0.31,
  Yew: 0.411,
  Achiever: 0.533,
  Elite: 0.7,
  Diseased: 0.87,
  Blisterwood: 1.064,
} as const satisfies AtLeastOne<Record<Rank, number>>;
