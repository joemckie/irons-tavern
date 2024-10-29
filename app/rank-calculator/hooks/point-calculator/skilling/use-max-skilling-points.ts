import { useCalculatorScaling } from '../use-calculator-scaling';
import { useMaxDiaryPoints } from './use-max-diary-points';
import { useMaxTotalLevelPoints } from './use-max-total-level-points';

export function useMaxSkillingPoints() {
  const scaling = useCalculatorScaling();
  const maxDiaryPoints = useMaxDiaryPoints();
  const maxTotalLevelPoints = useMaxTotalLevelPoints();

  return (maxDiaryPoints + maxTotalLevelPoints) * scaling;
}
