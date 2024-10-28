import { CombatAchievementTier } from '@/types/osrs';

export function mergeCombatAchievementTier(
  playerDetailsTier: CombatAchievementTier | null,
  previousSubmissionTier: CombatAchievementTier | 'None' | null,
): CombatAchievementTier | 'None' | null {
  if (!playerDetailsTier && !previousSubmissionTier) {
    return null;
  }

  if (!playerDetailsTier && previousSubmissionTier) {
    return previousSubmissionTier;
  }

  const combatAchievementTiers = Object.keys(CombatAchievementTier);
  const playerDetailsTierIndex = combatAchievementTiers.indexOf(
    playerDetailsTier ?? '',
  );
  const previousSubmissionTierIndex = combatAchievementTiers.indexOf(
    previousSubmissionTier ?? '',
  );

  return playerDetailsTierIndex > previousSubmissionTierIndex
    ? playerDetailsTier
    : previousSubmissionTier;
}
