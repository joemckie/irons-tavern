import { diaryLocationSchema } from '@/types/osrs';
import { achievementDiaryTierPoints } from '@/types/rank-calculator';

export function useMaxDiaryPoints() {
  return diaryLocationSchema.options.length * achievementDiaryTierPoints.Elite;
}
