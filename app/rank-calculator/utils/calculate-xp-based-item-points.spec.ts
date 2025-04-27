import { calculateXpBasedItemPoints } from './calculate-xp-based-item-points';

describe('calculateXpBasedItemPoints', () => {
  it('should return the correct points when estimatedXpToCompletion is divisible by ehpRate', () => {
    const result = calculateXpBasedItemPoints(1000, 100);
    expect(result).toBe(10);
  });

  it('should round up the result when estimatedXpToCompletion is not divisible by ehpRate', () => {
    const result = calculateXpBasedItemPoints(1050, 100);
    expect(result).toBe(11);
  });

  it('should handle edge case where ehpRate is 1', () => {
    const result = calculateXpBasedItemPoints(123, 1);
    expect(result).toBe(123);
  });

  it('should throw an error when ehpRate is 0 to avoid division by zero', () => {
    expect(() => calculateXpBasedItemPoints(1000, 0)).toThrow();
  });

  it('should handle large numbers correctly', () => {
    const result = calculateXpBasedItemPoints(1000000, 250);
    expect(result).toBe(4000);
  });
});
