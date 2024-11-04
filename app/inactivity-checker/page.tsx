import { differenceInDays } from 'date-fns';
import pluralise from 'pluralize';
import { list } from '@vercel/blob';
import Image from 'next/image';
import { constants } from '@/config/constants';
import { GroupMemberInfoResponse } from '@/types/temple-api';
import * as Sentry from '@sentry/nextjs';
import { ClanMember } from '../api/update-member-list/route';

async function getGroupMemberInfo(): Promise<GroupMemberInfoResponse> {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/group_member_info.php?id=${constants.temple.groupId}`,
  );

  return response.json();
}

async function getLatestMemberList() {
  const blobList = await list();
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  try {
    const response = await fetch(url);
    const data: ClanMember[] = await response.json();

    if (!data) {
      return {};
    }

    return data.reduce(
      (acc, member) => {
        acc[member.rsn.toLowerCase()] = member;

        return acc;
      },
      {} as Record<string, ClanMember>,
    );
  } catch (error) {
    Sentry.captureException(error);

    return {};
  }
}

export default async function InactivityCheckerPage() {
  const groupMemberInfo = await getGroupMemberInfo();
  const memberList = await getLatestMemberList();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-800 ">
      <h1 className="text-xl mb-4">{constants.temple.groupName}</h1>
      <table className="table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-4">RSN</th>
            <th>Rank</th>
            <th>Join date</th>
            <th className="p-4">Last checked</th>
            <th className="p-4">Estimated inactivity</th>
            <th className="p-4">On hiscores?</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupMemberInfo.data.memberlist)
            .sort(
              (
                [, { last_changed_xp_unix_time: a }],
                [, { last_changed_xp_unix_time: b }],
              ) => a - b,
            )
            .map(
              ([
                rsn,
                {
                  last_changed_xp: lastChangedXp,
                  on_hiscores: onHiscores,
                  last_checked: lastChecked,
                },
              ]) => {
                const estimatedDaysInactive = differenceInDays(
                  Date.now(),
                  lastChangedXp,
                );

                if (!rsn) {
                  return null;
                }

                const { rank, joinedDate } =
                  memberList[rsn.toLowerCase()] ?? {};

                return (
                  <tr key={rsn}>
                    <td className="border-b border-slate-700 p-4 text-slate-500">
                      <a
                        className="underline"
                        href={`https://templeosrs.com/player/overview.php?player=${rsn}&duration=alltime`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {rsn}
                      </a>
                    </td>
                    <td className="border-b border-slate-700 p-4 text-slate-500">
                      {rank && (
                        <Image
                          alt={`${rank} icon`}
                          src={`/icons/${rank.replaceAll(' ', '_').toLowerCase()}.png`}
                          height={24}
                          width={24}
                        />
                      )}
                    </td>
                    <td className="border-b border-slate-700 p-4 text-slate-500">
                      {joinedDate ?? 'Unknown'}
                    </td>
                    <td className="border-b border-slate-700 p-4 text-slate-500">
                      {lastChecked}
                    </td>
                    <td className="border-b border-slate-700 p-4 text-slate-500 ">
                      {`${pluralise('day', estimatedDaysInactive, true)}`}
                    </td>
                    <td className="border-b border-slate-700 p-4">
                      <span
                        className={
                          onHiscores ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {onHiscores ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                );
              },
            )}
        </tbody>
      </table>
    </main>
  );
}
