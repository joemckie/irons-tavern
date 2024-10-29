import { useWatch } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { maximumSkillLevel, maximumTotalLevel } from '@/types/osrs';
import { useMaxTotalLevelPoints } from './use-max-total-level-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

// View the function graph below
// https://www.desmos.com/calculator/pvb3brafeg
export function useTotalLevelPoints() {
  const maxPoints = useMaxTotalLevelPoints();
  const totalLevel = useWatch<FormData, 'totalLevel'>({
    name: 'totalLevel',
  });
  const scaling = useCalculatorScaling();
  const steps = maximumTotalLevel / maximumSkillLevel + 1; // Remove +1 when Sailing is released
  const nextLevel99Milestone = Math.ceil(totalLevel / maximumSkillLevel);
  const level99MilestonesAchieved = Math.floor(totalLevel / maximumSkillLevel);
  const factor = Number((maxPoints / ((steps * (steps + 1)) / 2)).toFixed(7));
  const remainder = (totalLevel % maximumSkillLevel) / maximumSkillLevel;
  const f0 = Number(
    (nextLevel99Milestone * (nextLevel99Milestone + 1) * (factor / 2)).toFixed(
      5,
    ),
  );
  const f1 = Number(
    (nextLevel99Milestone * (nextLevel99Milestone - 1) * (factor / 2)).toFixed(
      5,
    ),
  );
  const c0 = Number(
    (
      level99MilestonesAchieved *
      (level99MilestonesAchieved + 1) *
      (factor / 2)
    ).toFixed(5),
  );
  const gradient = Number(((f0 - f1) * remainder).toFixed(5));
  const points = Math.floor(gradient + c0);
  const scaledPoints = Math.floor(points * scaling);

  return scaledPoints;
}
