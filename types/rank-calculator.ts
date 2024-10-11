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

export enum Skill {
  Attack = 'Attack',
  Strength = 'Strength',
  Defence = 'Defence',
  Ranged = 'Ranged',
  Prayer = 'Prayer',
  Magic = 'Magic',
  Runecraft = 'Runecraft',
  Hitpoints = 'Hitpoints',
  Crafting = 'Crafting',
  Mining = 'Mining',
  Smithing = 'Smithing',
  Fishing = 'Fishing',
  Cooking = 'Cooking',
  Firemaking = 'Firemaking',
  Woodcutting = 'Woodcutting',
  Agility = 'Agility',
  Herblore = 'Herblore',
  Thieving = 'Thieving',
  Fletching = 'Fletching',
  Slayer = 'Slayer',
  Farming = 'Farming',
  Construction = 'Construction',
  Hunter = 'Hunter',
}

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

export interface RequiredItem {
  clogName: string;
  amount: number;
}

export interface BaseItem {
  image: string;
  name: string;
  points: number;
}

export interface CollectionLogItem extends BaseItem {
  requiredLevels?: AtLeastOne<Record<Skill, number>>;
  requiredItems: NonEmptyArray<RequiredItem>;
}

export interface CombatAchievementItem extends BaseItem {
  requiredCombatAchievements: NonEmptyArray<number>;
}

export type Item = CollectionLogItem | CombatAchievementItem;

interface Category {
  image: string;
  items: NonEmptyArray<Item>;
}

export type ItemsResponse = Record<string, Category>;
