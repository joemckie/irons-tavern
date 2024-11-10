import { PlayerName } from '@/app/schemas/player';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { validatePlayerExists } from '../../validation/player-validation';

export const AddPlayerSchema = zfd.formData({
  playerName: PlayerName.refine(validatePlayerExists, 'Invalid player name'),
  joinDate: z.date().max(new Date()),
});
