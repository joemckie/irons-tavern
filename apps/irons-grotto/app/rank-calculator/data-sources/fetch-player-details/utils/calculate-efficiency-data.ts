import { TempleOSRSPlayerStats } from '@/app/schemas/temple-api';

interface EfficiencyData {
  ehb: number | null;
  ehp: number | null;
}

export function calculateEfficiencyData(
  playerStats: TempleOSRSPlayerStats['data'] | null,
): EfficiencyData {
  if (!playerStats) {
    return {
      ehb: null,
      ehp: null,
    };
  }

  const {
    info: { Primary_ehb: primaryEhb, Primary_ehp: primaryEhp },
    [primaryEhb]: ehb,
    [primaryEhp]: ehp,
  } = playerStats;

  return {
    ehb,
    ehp,
  };
}
