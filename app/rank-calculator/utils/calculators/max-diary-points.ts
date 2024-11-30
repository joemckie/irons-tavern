import { DiaryLocation } from '@/app/schemas/osrs';
import { achievementDiaryTierPoints } from '@/app/schemas/rank-calculator';

export const maxDiaryPoints =
  DiaryLocation.options.length * achievementDiaryTierPoints.Elite;
