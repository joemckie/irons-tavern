import { z } from 'zod';

export const playerName = z.string().max(12, 'Player name is too long');
