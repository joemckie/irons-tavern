import Decimal from 'decimal.js-light';
import { maximumSkillLevel, maximumTotalLevel } from '@/app/schemas/osrs';
import { pointsConfig } from '../../config/points';

// View the function graph below
// https://www.desmos.com/calculator/pvb3brafeg
export function calculateTotalLevelPoints(totalLevel: number, scaling: number) {
  const { maximumTotalLevelPoints } = pointsConfig;

  if (!totalLevel) {
    return 0;
  }

  const steps = maximumTotalLevel / maximumSkillLevel + 1; // Remove +1 when Sailing is released

  const nextLevel99Milestone = Math.ceil(totalLevel / maximumSkillLevel);

  const level99MilestonesAchieved = Math.floor(totalLevel / maximumSkillLevel);

  const factor = new Decimal(maximumTotalLevelPoints)
    .dividedBy(new Decimal(steps).times(steps + 1).dividedBy(2))
    .toDecimalPlaces(7);

  const remainder = new Decimal(totalLevel)
    .mod(maximumSkillLevel)
    .dividedBy(maximumSkillLevel)
    .toDecimalPlaces(10);

  const f0 = new Decimal(nextLevel99Milestone)
    .times(nextLevel99Milestone + 1)
    .times(factor.dividedBy(2))
    .toDecimalPlaces(5);

  const f1 = new Decimal(nextLevel99Milestone)
    .times(nextLevel99Milestone - 1)
    .times(factor.dividedBy(2))
    .toDecimalPlaces(5);

  const c0 = new Decimal(level99MilestonesAchieved)
    .times(level99MilestonesAchieved + 1)
    .times(factor.dividedBy(2))
    .toDecimalPlaces(5);

  const gradient = new Decimal(f0)
    .minus(f1)
    .times(remainder)
    .toDecimalPlaces(5);

  const points = new Decimal(gradient).plus(c0);

  const scaledPoints = new Decimal(points)
    .times(scaling)
    .toDecimalPlaces(0, Decimal.ROUND_FLOOR)
    .toNumber();

  return scaledPoints;
}
