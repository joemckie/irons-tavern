import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import { DiaryLocation } from '@/app/schemas/osrs';
import { RankSubmissionDiff } from '@/app/schemas/rank-calculator';
import { FieldErrors } from 'react-hook-form';

export function calculateDiffErrors(diff: RankSubmissionDiff) {
  const errors: FieldErrors<RankCalculatorSchema> = {};

  if (diff.achievementDiaries) {
    (Object.keys(diff.achievementDiaries) as DiaryLocation[]).forEach(
      (diaryLocation) => {
        // @ts-expect-error Individual diaries are not typed
        errors[`achievementDiaries.${diaryLocation}`] = {
          type: 'value',
          message: `Expected ${diff.achievementDiaries?.[diaryLocation]}`,
        };
      },
    );
  }

  if (diff.acquiredItems) {
    diff.acquiredItems.forEach((item) => {
      // @ts-expect-error Individual items are not typed
      errors[`acquiredItems.${stripEntityName(item)}`] = {
        type: 'value',
        message: 'Item does not match API response',
      };
    });
  }

  if (diff.totalLevel) {
    errors.totalLevel = {
      type: 'value',
      message: `Expected ${diff.totalLevel}`,
    };
  }

  if (diff.collectionLogCount) {
    errors.collectionLogCount = {
      type: 'value',
      message: `Expected ${diff.collectionLogCount}`,
    };
  }

  if (diff.combatAchievementTier) {
    errors.combatAchievementTier = {
      type: 'value',
      message: `Expected ${diff.combatAchievementTier}`,
    };
  }

  if (diff.tzhaarCape) {
    errors.tzhaarCape = {
      type: 'value',
      message: `Expected ${diff.tzhaarCape}`,
    };
  }

  if (diff.hasBloodTorva) {
    errors.hasBloodTorva = {
      type: 'value',
      message: `Expected ${diff.hasBloodTorva}`,
    };
  }

  if (diff.hasDizanasQuiver) {
    errors.hasDizanasQuiver = {
      type: 'value',
      message: `Expected ${diff.hasDizanasQuiver}`,
    };
  }

  return errors;
}
