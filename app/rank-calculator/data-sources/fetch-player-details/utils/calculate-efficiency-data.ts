import { GameMode, TempleOSRSPlayerStats } from '@/types/temple-api';

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
    Ehb: ehb,
    Ehp: ehp,
    Im_ehb: ironEhb,
    Im_ehp: ironEhp,
    Uim_ehp: ultimateIronEhp,
    info: { 'Game mode': gameMode },
  } = playerStats;

  switch (gameMode) {
    case GameMode.GroupIronman:
      return {
        ehb,
        ehp,
      };
    case GameMode.Ironman:
    case GameMode.HardcoreIronman:
      return {
        ehb: ironEhb,
        ehp: ironEhp,
      };
    case GameMode.UltimateIronman:
      return {
        ehb: ironEhb,
        ehp: ultimateIronEhp,
      };
    default:
      return {
        ehb: null,
        ehp: null,
      };
  }
}
