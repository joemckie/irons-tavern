import { GameMode, TempleOSRSPlayerStats } from '@/app/schemas/temple-api';

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
    case GameMode.enum.GroupIronman:
      return {
        ehb,
        ehp,
      };
    case GameMode.enum.Ironman:
    case GameMode.enum.HardcoreIronman:
      return {
        ehb: ironEhb,
        ehp: ironEhp,
      };
    case GameMode.enum.UltimateIronman:
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
