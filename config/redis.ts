export enum RedisKeyNamespace {
  RankSubmission = 'rank-submission',
  RankSubmissions = 'rank-submissions',
  LatestRankSubmission = `${RedisKeyNamespace.RankSubmissions}:latest`,
  OsrsAccounts = 'osrs-accounts',
  User = 'user',
}

export function latestRankSubmissionKey(userId: string, playerName: string) {
  return `${RedisKeyNamespace.User}:${userId}:${playerName.toLowerCase()}:${RedisKeyNamespace.LatestRankSubmission}` as const;
}

export function userRankSubmissionsKey(userId: string) {
  return `${RedisKeyNamespace.User}:${userId}:${RedisKeyNamespace.RankSubmissions}` as const;
}

export function userOsrsAccountsKey(userId: string) {
  return `${RedisKeyNamespace.User}:${userId}:${RedisKeyNamespace.OsrsAccounts}` as const;
}

export function rankSubmissionKey(id: string) {
  return `${RedisKeyNamespace.RankSubmission}:${id}` as const;
}
