import { DiaryTier } from '@/types/osrs';
import { AchievementDiaryMap } from '@/types/rank-calculator';
import { mergeWith } from 'lodash';

export function mergeAchievementDiaries(
  playerDetails: AchievementDiaryMap | null,
  previousSubmission: AchievementDiaryMap | null,
) {
  if (!playerDetails && !previousSubmission) {
    return null;
  }

  const diaryTiers = Object.keys(DiaryTier);

  return mergeWith(
    {},
    playerDetails,
    previousSubmission,
    (playerDetailsVal: DiaryTier, previousSubmissionVal: DiaryTier) => {
      if (
        diaryTiers.indexOf(playerDetailsVal) >
        diaryTiers.indexOf(previousSubmissionVal)
      ) {
        return playerDetailsVal;
      }

      return previousSubmissionVal;
    },
  );
}
