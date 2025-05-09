import { z } from 'zod';

export const TavernDiarySection = z.enum([
  'Combat',
  'Skilling',
  'Collection Log',
]);

export type TavernDiarySection = z.infer<typeof TavernDiarySection>;

export const TavernDiaryTier = z.enum([
  'Drunkard',
  'Bartender',
  'Landlord',
  'Baron',
  'Duke',
]);

export type TavernDiaryTier = z.infer<typeof TavernDiaryTier>;
