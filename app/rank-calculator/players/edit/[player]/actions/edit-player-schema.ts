import { PlayerName } from '@/app/schemas/player';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { validatePlayerExists } from '../../../validation/player-validation';

export const EditPlayerSchema = zfd.formData({
  playerName: PlayerName.refine(validatePlayerExists, 'Invalid player name'),
  joinDate: z.date().max(new Date()),
});

export type EditPlayerSchema = z.infer<typeof EditPlayerSchema>;
