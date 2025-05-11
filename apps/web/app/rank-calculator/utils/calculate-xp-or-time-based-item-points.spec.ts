import { calculateXpOrTimeBasedItemPoints } from './calculate-xp-or-time-based-item-points';

it('returns the correct points when estimatedXpOrTimeToCompletion is divisible by ehpRate', () => {
  const result = calculateXpOrTimeBasedItemPoints(1000, 100);
  expect(result).toBe(50);
});

it('rounds up the result when estimatedXpOrTimeToCompletion is not divisible by ehpRate', () => {
  const result = calculateXpOrTimeBasedItemPoints(1050, 100);
  expect(result).toBe(53);
});

it('handles edge case where ehpRate is 1', () => {
  const result = calculateXpOrTimeBasedItemPoints(123, 1);
  expect(result).toBe(615);
});

it('throws an error when ehpRate is 0 to avoid division by zero', () => {
  expect(() => calculateXpOrTimeBasedItemPoints(1000, 0)).toThrow();
});

it('handles large numbers correctly', () => {
  const result = calculateXpOrTimeBasedItemPoints(1000000, 250);
  expect(result).toBe(20000);
});
