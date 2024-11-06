import { z } from 'zod';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
  maximumSkillLevel,
  MiniQuest,
  Quest,
  Skill,
} from './osrs';

export interface DiaryTierData {
  complete: boolean;
  tasks: boolean[];
}

export enum QuestStatus {
  NotStarted,
  Started,
  Completed,
}

export const LevelMap = z.record(
  Skill,
  z.number().min(1).max(maximumSkillLevel),
);

export type LevelMap = z.infer<typeof LevelMap>;

export enum HolidayTrack {
  "Bunny's Sugar Rush" = "Bunny's Sugar Rush",
  "Diango's Little Helpers" = "Diango's Little Helpers",
  'Dies Irae' = 'Dies Irae',
  "Dot's Yuletide" = "Dot's Yuletide",
  'Easter Jig' = 'Easter Jig',
  "Eve's Epinette" = "Eve's Epinette",
  'A Festive Party' = 'A Festive Party',
  'Funny Bunnies' = 'Funny Bunnies',
  'Grimly Fiendish' = 'Grimly Fiendish',
  'High Spirits' = 'High Spirits',
  'Jungle Bells' = 'Jungle Bells',
  'Jungle Island Xmas' = 'Jungle Island Xmas',
  'Land of Snow' = 'Land of Snow',
  'Nox Irae' = 'Nox Irae',
  "Scrubfoot's Descent" = "Scrubfoot's Descent",
  'Sea Minor Shanty' = 'Sea Minor Shanty',
  'Sea Shanty Xmas' = 'Sea Shanty Xmas',
  'Sunny Side Up' = 'Sunny Side Up',
  'Winter Funfair' = 'Winter Funfair',
}

export interface WikiSyncResponse {
  username: string;
  timestamp: string;
  league_tasks: unknown[];
  achievement_diaries: Record<
    DiaryLocation,
    Record<Exclude<DiaryTier, 'None'>, DiaryTierData>
  >;
  levels: LevelMap & { Overall?: number };
  music_tracks: Record<string, boolean>;
  quests: Record<Quest | MiniQuest, QuestStatus>;
  combat_achievements: number[];
}

export interface WikiSyncError {
  code: string;
  error: string;
}

export function isWikiSyncError(
  wikiSyncResponse: WikiSyncResponse | WikiSyncError,
): wikiSyncResponse is WikiSyncError {
  return (wikiSyncResponse as WikiSyncError).code !== undefined;
}

export interface CombatAchievementListResponse {
  query: {
    printrequests: unknown;
    results: Record<
      string,
      {
        printouts: {
          'Combat Achievement JSON': string[];
        };
        fulltext: string;
        fullurl: string;
        namespace: number;
        exists: '1';
        displaytitle: string;
      }
    >;
    serializer: string;
    version: number;
    meta: unknown;
  };
}

export interface CombatAchievementJson {
  monster: string;
  type: string;
  name: string;
  tier: Exclude<CombatAchievementTier, 'None'>;
  id: string;
  task: string;
}
