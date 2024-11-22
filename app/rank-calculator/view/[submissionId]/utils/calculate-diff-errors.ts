import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import { DiaryLocation } from '@/app/schemas/osrs';
import { RankSubmissionDiff } from '@/app/schemas/rank-calculator';
import { FieldErrors } from 'react-hook-form';

export function calculateDiffErrors(diff: RankSubmissionDiff) {
  const errors: FieldErrors = {};

  if (diff.achievementDiaries) {
    (Object.keys(diff.achievementDiaries) as DiaryLocation[]).forEach(
      (diaryLocation) => {
        errors[`achievementDiaries.${diaryLocation}`] = {
          type: 'value',
          message: `Expected ${diff.achievementDiaries?.[diaryLocation]}`,
        };
      },
    );
  }

  if (diff.acquiredItems) {
    diff.acquiredItems.forEach((item) => {
      errors[`acquiredItems.${stripEntityName(item)}`] = {
        type: 'value',
        message: 'Item does not match API response',
      };
    });
  }

  if (diff.ehb) {
    errors.ehb = {
      type: 'value',
      message: `Expected ${diff.ehb}`,
    };
  }

  if (diff.ehp) {
    errors.ehp = {
      type: 'value',
      message: `Expected ${diff.ehp}`,
    };
  }

  if (diff.totalLevel) {
    errors.totalLevel = {
      type: 'value',
      message: `Expected ${diff.totalLevel}`,
    };
  }

  return errors;
}
