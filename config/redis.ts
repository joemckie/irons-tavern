enum RedisKeyNamespace {
  RankSubmission = 'rank-submission',
  RankSubmissions = 'rank-submissions',
  OsrsAccounts = 'osrs-accounts',
  User = 'user',
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
