import { z } from 'zod';

export const PlayerName = z.string().max(12, 'Player name is too long');

export const Player = z.object({
  rsn: PlayerName,
  joinDate: z.date(),
});
export type Player = z.infer<typeof Player>;
