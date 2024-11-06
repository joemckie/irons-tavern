import { z } from 'zod';

export const playerNameSchema = z.string().max(12, 'Player name is too long');
