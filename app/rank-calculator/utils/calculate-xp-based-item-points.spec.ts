import { calculateXpBasedItemPoints } from './calculate-xp-based-item-points';

describe('calculateXpBasedItemPoints', () => {
  it('returns the correct points when estimatedXpToCompletion is divisible by ehpRate', () => {
    const result = calculateXpBasedItemPoints(1000, 100);
    expect(result).toBe(50);
  });

  it('rounds up the result when estimatedXpToCompletion is not divisible by ehpRate', () => {
    const result = calculateXpBasedItemPoints(1050, 100);
    expect(result).toBe(53);
  });

  it('handles edge case where ehpRate is 1', () => {
    const result = calculateXpBasedItemPoints(123, 1);
    expect(result).toBe(615);
  });

  it('throws an error when ehpRate is 0 to avoid division by zero', () => {
    expect(() => calculateXpBasedItemPoints(1000, 0)).toThrow();
  });

  it('handles large numbers correctly', () => {
    const result = calculateXpBasedItemPoints(1000000, 250);
    expect(result).toBe(20000);
  });
});
