import { CombatAchievementTier } from '@/app/schemas/osrs';

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

  const combatAchievementTiers = CombatAchievementTier.options;
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
