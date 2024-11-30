import { z } from 'zod';

export const CheckMethod = z.enum(['datapoint', 'get-game-mode']);
