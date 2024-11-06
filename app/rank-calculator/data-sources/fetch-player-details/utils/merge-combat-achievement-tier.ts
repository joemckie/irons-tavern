import {
  CombatAchievementTier,
  combatAchievementTierSchema,
} from '@/types/osrs';

export function mergeCombatAchievementTier(
  playerDetailsTier: CombatAchievementTier | null,
  previousSubmissionTier: CombatAchievementTier | null,
): CombatAchievementTier | null {
  if (!playerDetailsTier && !previousSubmissionTier) {
    return null;
  }

  if (!playerDetailsTier && previousSubmissionTier) {
    return previousSubmissionTier;
  }

  const combatAchievementTiers = combatAchievementTierSchema.options;
  const playerDetailsTierIndex =
    (playerDetailsTier && combatAchievementTiers.indexOf(playerDetailsTier)) ??
    0;
  const previousSubmissionTierIndex =
    (previousSubmissionTier &&
      combatAchievementTiers.indexOf(previousSubmissionTier)) ??
    0;

  return playerDetailsTierIndex > previousSubmissionTierIndex
    ? playerDetailsTier
    : previousSubmissionTier;
}
