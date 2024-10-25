import { DiaryLocation } from '@/types/osrs';
import { CommonPointCalculatorData } from '@/types/rank-calculator';

export interface SkillingPointCalculatorData extends CommonPointCalculatorData {
  ehpPoints: number;
  totalLevelPoints: number;
  achievementDiariesPoints: Record<DiaryLocation, number>;
}

export function useSkillingPointCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    ehpPoints: 0,
    totalLevelPoints: 0,
    achievementDiariesPoints: {
      'Kourend & Kebos': 0,
      'Lumbridge & Draynor': 0,
      'Western Provinces': 0,
      Ardougne: 0,
      Desert: 0,
      Falador: 0,
      Fremennik: 0,
      Kandarin: 0,
      Karamja: 0,
      Morytania: 0,
      Varrock: 0,
      Wilderness: 0,
    },
  } satisfies SkillingPointCalculatorData;
}
