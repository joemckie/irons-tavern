import { Rank } from '@/config/enums';
import { z } from 'zod';

export const PlayerName = z.string().max(12, 'Player name is too long');

export const Player = z.object({
  isNameInvalid: z.literal(true).optional(),
  joinDate: z.date(),
  rank: Rank.optional(),
  rsn: PlayerName,
});

export type Player = z.infer<typeof Player>;
