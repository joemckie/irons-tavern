import { z } from 'zod';

export const PlayerName = z.string().max(12, 'Player name is too long');
