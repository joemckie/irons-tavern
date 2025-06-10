enum RedisKeyNamespace {
  RankSubmission = 'rank-submission',
  RankSubmissions = 'rank-submissions',
  DraftRankSubmission = 'draft-rank-submission',
  SubmissionMetadata = 'metadata',
  SubmissionDiff = 'diff',
  OsrsAccounts = 'osrs-accounts',
  User = 'user',
  PlayerGameModes = 'player-game-modes',
  RankUpMessages = 'rank-up-messages',
}

export function userRankSubmissionsKey(userId: string, playerName: string) {
  return `${RedisKeyNamespace.User}:${userId}:${RedisKeyNamespace.RankSubmissions}:${playerName.toLowerCase()}` as const;
}

export function userOSRSAccountsKey(userId: string) {
  return `${RedisKeyNamespace.User}:${userId}:${RedisKeyNamespace.OsrsAccounts}` as const;
}

export function rankSubmissionKey(id: string) {
  return `${RedisKeyNamespace.RankSubmission}:${id}` as const;
}

export function userDraftRankSubmissionKey(userId: string, playerName: string) {
  return `${RedisKeyNamespace.User}:${userId}:${RedisKeyNamespace.DraftRankSubmission}:${playerName.toLowerCase()}` as const;
}

export function rankSubmissionMetadataKey(id: string) {
  return `${rankSubmissionKey(id)}:${RedisKeyNamespace.SubmissionMetadata}` as const;
}

export function rankSubmissionDiffKey(id: string) {
  return `${rankSubmissionKey(id)}:${RedisKeyNamespace.SubmissionDiff}` as const;
}

export const playerGameModesKey = RedisKeyNamespace.PlayerGameModes;

export const rankUpMessagesKey = RedisKeyNamespace.RankUpMessages;
