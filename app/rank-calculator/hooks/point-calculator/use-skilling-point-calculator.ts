import { DiaryLocation } from '@/types/osrs';
import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useSkillingPointCalculator() {
  const achievementDiariesPoints: Record<DiaryLocation, number> = {
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
  };

  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    ehpPoints: 0,
    totalLevelPoints: 0,
    achievementDiariesPoints,
  } satisfies CategoryPointCalculatorData;
}
