import { DiaryLocation } from '@/types/osrs';
import { achievementDiaryTierPoints } from '@/types/rank-calculator';

export function useMaxDiaryPoints() {
  return DiaryLocation.options.length * achievementDiaryTierPoints.Elite;
}
