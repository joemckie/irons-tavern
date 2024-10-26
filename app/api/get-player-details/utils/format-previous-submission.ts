import { FormData, PlayerData } from '@/types/rank-calculator';

/**
 * Aligns the responses betweeen the API and the form sumission.
 *
 * The form is expected to be more "complete", whereas the API
 * can have null values (when data cannot be loaded from a 3rd party).
 */
export function formatPreviousSubmission(
  previousSubmission: FormData | null,
): Omit<PlayerData, 'collectionLogTotal'> | null {
  if (!previousSubmission) {
    return null;
  }

  return {
    ...previousSubmission,
    acquiredItems: Object.keys(previousSubmission.acquiredItems).filter(
      (key) => previousSubmission.acquiredItems[key],
    ),
    combatAchievementTier:
      previousSubmission.combatAchievementTier === 'None'
        ? null
        : previousSubmission.combatAchievementTier,
  };
}
