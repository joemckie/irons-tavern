import { useCalculatorScaling } from '../use-calculator-scaling';
import { useMaxDiaryPoints } from './use-max-diary-points';
import { useMaxTotalLevelPoints } from './use-max-total-level-points';

export function useMaxSkillingPoints() {
  const scaling = useCalculatorScaling();
  const maxDiaryPoints = useMaxDiaryPoints();
  const maxTotalLevelPoints = useMaxTotalLevelPoints();

  // Remove this when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const sailingOffset = 4000;

  return (maxDiaryPoints + maxTotalLevelPoints - sailingOffset) * scaling;
}
