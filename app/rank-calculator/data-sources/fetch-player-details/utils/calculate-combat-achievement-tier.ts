import { CombatAchievementTier } from '@/app/schemas/osrs';
import { getCaIdMap } from '../get-combat-achievement-id-map';
import { getCombatAchievementTierThresholds } from '../get-combat-achievement-tier-thresholds';

export async function calculateCombatAchievementTier(
  combatAchievements: number[],
) {
  try {
    const caIdMap = await getCaIdMap();
    const combatAchievementTierThresholds =
      await getCombatAchievementTierThresholds();

    if (!caIdMap || !combatAchievementTierThresholds) {
      return null;
    }

    const totalCaPoints = combatAchievements.reduce(
      (acc, val) => acc + caIdMap[val],
      0,
    );
    const combatAchievementTier = (
      Object.entries(combatAchievementTierThresholds) as [
        CombatAchievementTier,
        number,
      ][]
    ).reduceRight<CombatAchievementTier | null>((acc, [tier, threshold]) => {
      if (!acc && totalCaPoints >= threshold) {
        return tier;
      }

      return acc;
    }, null);

    return combatAchievementTier;
  } catch {
    return null;
  }
}
