import { DiaryLocation, DiaryTier, MiniQuest, Quest, Skill } from './osrs';

export interface DiaryTierData {
  complete: boolean;
  tasks: boolean[];
}

export enum QuestStatus {
  NotStarted,
  Started,
  Completed,
}

export type LevelMap = Record<Skill, number>;

export interface WikiSyncResponse {
  achievement_diaries: Record<DiaryLocation, Record<DiaryTier, DiaryTierData>>;
  levels: LevelMap & { Overall: number };
  quests: Record<Quest | MiniQuest, QuestStatus>;
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
