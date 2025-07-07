import {
  RankStructure,
  RankSubmissionMetadata,
} from '@/app/schemas/rank-calculator';
import { rankStructureTiers, StaffRank, staffRankTypes } from '@/config/ranks';
import { userHasManageRolesPermission } from './user-has-manage-roles-permission';
import { getUserRankFromDiscordRoles } from './get-user-rank-from-discord-roles';
import { redis } from '@/redis';
import { Player } from '@/app/schemas/player';
import { rankSubmissionMetadataKey, userOSRSAccountsKey } from '@/config/redis';

export async function userCanModerateSubmission(
  userPermissions: string | undefined,
  userId: string | undefined,
  submissionId: string,
  submittedRankStructure: RankStructure,
  submissionPlayerName: string,
) {
  if (!userPermissions || !userId) {
    return false;
  }

  const hasManageRolesPermission =
    userHasManageRolesPermission(userPermissions);

  if (!hasManageRolesPermission) {
    return false;
  }

  const submissionMetadata = await redis.hgetall<RankSubmissionMetadata>(
    rankSubmissionMetadataKey(submissionId),
  );

  if (!submissionMetadata) {
    throw new Error('Unable to find submission metadata');
  }

  if (submissionMetadata.submittedBy === userId) {
    return false; // User cannot moderate their own submission
  }

  const [userRank, submitterPlayer] = await Promise.all([
    getUserRankFromDiscordRoles(userId),
    redis.hget<Player>(
      userOSRSAccountsKey(submissionMetadata.submittedBy),
      submissionPlayerName.toLowerCase(),
    ),
  ]);

  const { success: userIsModeratorOrAbove } = RankStructure.exclude([
    'Standard',
    'Admin',
  ]).safeParse(userRank);

  const { success: submitterIsNotCurrentlyStaff } = StaffRank.safeParse(
    submitterPlayer?.rank,
  );

  if (
    (!userIsModeratorOrAbove && submitterIsNotCurrentlyStaff) ||
    userRank === null
  ) {
    // Only mod+ can approve new staff submissions
    return false;
  }

  const userRankTier = rankStructureTiers[staffRankTypes[userRank]];
  const submittedRankTier = rankStructureTiers[submittedRankStructure];

  return submittedRankTier < userRankTier;
}
