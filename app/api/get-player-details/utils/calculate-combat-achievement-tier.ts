import { CombatAchievementTier } from '@/types/osrs';
import { getCaIdMap } from './get-ca-id-map';
import { getCaTierThresholds } from './get-ca-tier-thresholds';

export async function calculateCombatAchievementTier(
  combatAchievements: number[],
) {
  try {
    const caIdMap = await getCaIdMap();
    const caTierThresholds = await getCaTierThresholds();

    if (!caIdMap || !caTierThresholds) {
      return null;
    }

    const totalCaPoints = combatAchievements.reduce(
      (acc, val) => acc + caIdMap[val],
      0,
    );
    const caTier = (
      Object.entries(caTierThresholds) as [CombatAchievementTier, number][]
    ).reduceRight<CombatAchievementTier | null>((acc, [tier, threshold]) => {
      if (!acc && totalCaPoints >= threshold) {
        return tier;
      }

      return acc;
    }, null);

    return caTier;
  } catch {
    return null;
  }
}
