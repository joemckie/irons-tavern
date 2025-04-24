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
  Water: 0.0091,
  Oak: 0.0364,
  Earth: 0.0742,
  Willow: 0.1226,
  Nature: 0.1836,
  Maple: 0.2562,
  Law: 0.3497,
  Yew: 0.4618,
  Achiever: 0.5993,
  Elite: 0.79,
  Diseased: 0.9721,
  Blisterwood: 1.1925,
} satisfies AtLeastOne<Record<Rank, number>>;
