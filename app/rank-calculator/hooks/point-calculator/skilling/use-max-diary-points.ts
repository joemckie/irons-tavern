import { DiaryLocation } from '@/app/schemas/osrs';
import { achievementDiaryTierPoints } from '@/app/schemas/rank-calculator';

export function useMaxDiaryPoints() {
  return DiaryLocation.options.length * achievementDiaryTierPoints.Elite;
}
