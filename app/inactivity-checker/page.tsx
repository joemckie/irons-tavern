import { differenceInDays } from 'date-fns';
import pluralise from 'pluralize';
import { list } from '@vercel/blob';
import Image from 'next/image';
import { unset } from 'lodash';
import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import * as Sentry from '@sentry/nextjs';
import { ClanMember } from '../api/update-member-list/route';
import { getRankImageUrl } from '../rank-calculator/utils/get-rank-image-url';
import { TempleOSRSGroupMemberInfo } from '../schemas/temple-api';

function normalisePlayerName(player: string) {
  return player.replaceAll(/(-|_)/g, ' ').toLowerCase();
}

async function getGroupMemberInfo() {
  const response = await fetch(
    `${clientConstants.temple.baseUrl}/api/group_member_info.php?id=${serverConstants.temple.groupId}`,
  );

  const data = await response.json();

  // Temple returns an empty player for some reason, so remove it
  unset(data.data.memberlist, '');

  return TempleOSRSGroupMemberInfo.parse(data);
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
        acc[normalisePlayerName(member.rsn)] = member;

        return acc;
      },
      {} as Record<string, ClanMember>,
    );
  } catch (error) {
    Sentry.captureException(error);

    return {};
  }
}

export const dynamic = 'force-dynamic';

export default async function InactivityCheckerPage() {
  const groupMemberInfo = await getGroupMemberInfo();
  const memberList = await getLatestMemberList();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-800 ">
      <h1 className="text-xl mb-4">{serverConstants.temple.groupName}</h1>
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
          {Object.values(memberList)

            .sort(
              ({ rsn: a }, { rsn: b }) =>
                groupMemberInfo.data.memberlist[normalisePlayerName(a)]
                  .last_changed_xp_unix_time -
                groupMemberInfo.data.memberlist[normalisePlayerName(b)]
                  .last_changed_xp_unix_time,
            )
            .map(({ rsn, joinedDate, rank }) => {
              const {
                player: templePlayerName,
                last_changed_xp: lastChangedXp,
                on_hiscores: onHiscores,
                last_checked: lastChecked,
              } = groupMemberInfo.data.memberlist[normalisePlayerName(rsn)];

              const estimatedDaysInactive = differenceInDays(
                Date.now(),
                lastChangedXp,
              );

              return (
                <tr key={rsn}>
                  <td className="border-b border-slate-700 p-4 text-slate-500">
                    <a
                      className="underline"
                      href={`https://templeosrs.com/player/overview.php?player=${templePlayerName}&duration=alltime`}
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
                        src={getRankImageUrl(rank)}
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
                    {onHiscores ? (
                      <span className="text-green-400">Yes</span>
                    ) : (
                      <span className="text-red-400">No</span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
}
