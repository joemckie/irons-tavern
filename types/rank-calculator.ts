type DiaryLocation =
  | 'Ardougne'
  | 'Desert'
  | 'Falador'
  | 'Fremennik'
  | 'Kandarin'
  | 'Karamja'
  | 'Kourend & Kebos'
  | 'Lumbridge & Draynor'
  | 'Morytania'
  | 'Varrock'
  | 'Western Provinces'
  | 'Wilderness';

type DiaryTier = 'Easy' | 'Medium' | 'Hard' | 'Elite';

type CombatAchievementTier =
  | 'Easy'
  | 'Medium'
  | 'Hard'
  | 'Elite'
  | 'Master'
  | 'Grandmaster';

export interface PlayerDataResponse {
  lastChecked: number;
  diaries: Record<DiaryLocation, DiaryTier>;
  username: string;
  items: string[];
  combatAchievementTier: CombatAchievementTier;
  lastKnownRank: {
    structure: string;
    name: string;
  };
  collectionLogEnabled: boolean;
  wikiSyncEnabled: boolean;
  ehb: number;
  level: number;
  ehp: number;
  clogs: number;
}

export interface Item {
  name: string;
  points: number;
  requiredItems: {
    clogName: string;
    amount: number;
    requiredLevels?: {
      skill: string;
      level: number;
    }[];
  }[];
  image: string;
}

interface Category {
  image: string;
  items: Item[];
}

export type ItemsResponse = Record<string, Category>;
