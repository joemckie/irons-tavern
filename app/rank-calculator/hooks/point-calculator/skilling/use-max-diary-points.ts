import { DiaryLocation } from '@/types/osrs';
import { achievementDiaryTierPoints } from '@/types/rank-calculator';

export function useMaxDiaryPoints() {
  return Object.values(DiaryLocation).length * achievementDiaryTierPoints.Elite;
}
