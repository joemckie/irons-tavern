import { clientConstants } from '@/config/constants.client';
import Decimal from 'decimal.js-light';
import { z } from 'zod';

export function calculateXpOrTimeBasedItemPoints(
  estimatedXpOrTimeToCompletion: number,
  ehpRate: number = 1,
) {
  // Validate that the provided numbers are greater than 0
  const parsedEstimatedXpToCompletion = z
    .number()
    .positive()
    .parse(estimatedXpOrTimeToCompletion);
  const parsedEhpRate = z.number().positive().parse(ehpRate);

  return new Decimal(parsedEstimatedXpToCompletion)
    .dividedBy(parsedEhpRate)
    .times(clientConstants.calculator.notableItemsPointsPerHour)
    .toDecimalPlaces(0, Decimal.ROUND_CEIL)
    .toNumber();
}
