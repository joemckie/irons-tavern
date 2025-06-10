import { DiaryTier } from '@/app/schemas/osrs';
import { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { mergeWith } from 'lodash';

export function mergeAchievementDiaries(
  playerDetails: AchievementDiaryMap | null,
  previousSubmission: AchievementDiaryMap | null,
) {
  if (!playerDetails && !previousSubmission) {
    return null;
  }

  return mergeWith(
    {},
    playerDetails,
    previousSubmission,
    (playerDetailsVal: DiaryTier, previousSubmissionVal: DiaryTier) => {
      if (
        DiaryTier.options.indexOf(playerDetailsVal) >
        DiaryTier.options.indexOf(previousSubmissionVal)
      ) {
        return playerDetailsVal;
      }

      return previousSubmissionVal;
    },
  );
}
