import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { GroupMemberInfoResponse } from '@/app/schemas/temple-api';

export async function getGroupMemberInfo(): Promise<GroupMemberInfoResponse> {
  const response = await fetch(
    `${clientConstants.temple.baseUrl}/api/group_member_info.php?id=${serverConstants.temple.groupId}&details=1`,
  );

  return GroupMemberInfoResponse.parse(await response.json());
}
