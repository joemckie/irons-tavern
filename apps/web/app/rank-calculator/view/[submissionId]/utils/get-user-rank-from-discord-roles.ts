import 'core-js/actual/map';
import 'core-js/actual/iterator/reduce';

import { fetchUserDiscordRoles } from '@/app/rank-calculator/data-sources/fetch-user-discord-roles';
import { staffRankDiscordRoles } from '@/config/discord-roles';
import type { StaffRank } from '@/config/ranks';

export async function getUserRankFromDiscordRoles(userId: string) {
  const userDiscordRoles = await fetchUserDiscordRoles(userId);

  if (!userDiscordRoles) {
    return null;
  }

  const userDiscordRolesMap = new Map(
    [...userDiscordRoles].map((role) => [role, true]),
  );

  return staffRankDiscordRoles
    .entries()
    .reduce<StaffRank | null>((acc, [roleId, rankName]) => {
      if (!acc && userDiscordRolesMap.has(roleId)) {
        return rankName;
      }

      return acc;
    }, null);
}
