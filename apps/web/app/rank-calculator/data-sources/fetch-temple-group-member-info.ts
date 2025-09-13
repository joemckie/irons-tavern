'use server';

import { clientConstants } from '@/config/constants.client';
import { TempleOSRSGroupMemberInfo } from '@/app/schemas/temple-api';
import * as Sentry from '@sentry/nextjs';
import { serverConstants } from '@/config/constants.server';

export async function fetchTempleGroupMemberInfo() {
  try {
    const groupMemberInfoQueryParams = new URLSearchParams({
      id: serverConstants.temple.groupId,
      skills: '1',
      bosses: '1',
      details: '1',
    });

    const playerStatsResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/group_member_info.php?${groupMemberInfoQueryParams}`,
    );

    return TempleOSRSGroupMemberInfo.parse(await playerStatsResponse.json())
      .data.memberlist;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
