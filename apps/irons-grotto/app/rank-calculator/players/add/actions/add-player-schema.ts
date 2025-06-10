import { PlayerName } from '@/app/schemas/player';
import { z } from 'zod';
import { validatePlayerExists } from '../../validation/player-validation';

export const AddPlayerSchema = z.object({
  playerName: PlayerName.refine(validatePlayerExists, 'Invalid player name'),
  joinDate: z.date().max(new Date()),
  isMobileOnly: z.boolean().optional().default(false),
});

export type AddPlayerSchema = z.infer<typeof AddPlayerSchema>;
