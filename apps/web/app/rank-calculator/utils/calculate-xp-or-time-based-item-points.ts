import Decimal from 'decimal.js-light';
import { z } from 'zod';
import { pointsConfig } from '../config/points';

export function calculateXpOrTimeBasedItemPoints(
  estimatedXpOrTimeToCompletion: number,
  ehpRate = 1,
) {
  // Validate that the provided numbers are greater than 0
  const parsedEstimatedXpToCompletion = z
    .number()
    .positive()
    .parse(estimatedXpOrTimeToCompletion);
  const parsedEhpRate = z.number().positive().parse(ehpRate);

  return new Decimal(parsedEstimatedXpToCompletion)
    .dividedBy(parsedEhpRate)
    .times(pointsConfig.notableItemsPointsPerHour)
    .toDecimalPlaces(0, Decimal.ROUND_CEIL)
    .toNumber();
}
