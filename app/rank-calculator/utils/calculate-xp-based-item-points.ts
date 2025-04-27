import { z } from 'zod';

export function calculateXpBasedItemPoints(
  estimatedXpToCompletion: number,
  ehpRate: number,
) {
  // Validate that the provided numbers are greater than 0
  const parsedEstimatedXpToCompletion = z
    .number()
    .positive()
    .parse(estimatedXpToCompletion);
  const parsedEhpRate = z.number().positive().parse(ehpRate);

  return Math.ceil(parsedEstimatedXpToCompletion / parsedEhpRate);
}
