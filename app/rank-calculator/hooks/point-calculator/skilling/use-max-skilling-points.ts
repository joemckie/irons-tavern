import { maxTotalLevelPoints } from '@/app/rank-calculator/utils/calculators/max-total-level-points';
import { maxDiaryPoints } from '@/app/rank-calculator/utils/calculators/max-diary-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxSkillingPoints() {
  const scaling = useCalculatorScaling();

  // Remove this when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const sailingOffset = 4000;

  return (maxDiaryPoints + maxTotalLevelPoints - sailingOffset) * scaling;
}
