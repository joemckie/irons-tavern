import { CombatAchievementTier, DiaryTier } from '@/types/osrs';
import { FormData, RankStructure } from '@/types/rank-calculator';

export const earlyGamePlayerFormData = {
  items: {
    'Blood moon tassets': true,
    'Tome of fire': true,
    'Zombie axe': true,
    'Abyssal protector': true,
    'Rift guardian': true,
  },
  achievementDiaries: {
    Ardougne: DiaryTier.Easy,
    Desert: 'None',
    Falador: 'None',
    Fremennik: 'None',
    Kandarin: 'None',
    Karamja: DiaryTier.Easy,
    'Kourend & Kebos': DiaryTier.Easy,
    'Lumbridge & Draynor': DiaryTier.Easy,
    Morytania: 'None',
    Varrock: DiaryTier.Easy,
    'Western Provinces': DiaryTier.Easy,
    Wilderness: 'None',
  },
  joinDate: new Date('2024-03-12'),
  collectionLogCount: 119,
  playerName: 'Riftletics',
  caTier: CombatAchievementTier.Easy,
  ehb: 1,
  ehp: 368,
  totalLevel: 1588,
  rankStructure: RankStructure.Standard,
} satisfies FormData;
