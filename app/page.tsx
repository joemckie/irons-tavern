import { differenceInDays } from 'date-fns';
import pluralise from 'pluralize';

const groupId = '1061';
const baseUrl = 'https://templeosrs.com';

interface MemberInfo {
  player: string;
  player_name_with_capitalization: string;
  country: string;
  game_mode: number;
  level_3: 1 | 0;
  free_to_play: number;
  gim_mode: number | null;
  leagues_iv_points: number | null;
  on_hiscores: 1 | 0;
  last_checked: string;
  last_checked_unix_time: number;
  last_changed_xp: string;
  last_changed_xp_unix_time: number;
  last_changed_kc: string;
  last_changed_kc_unix_time: number;
}

interface GroupMemberInfoResponse {
  data: {
    memberlist: Record<string, MemberInfo>;
  };
}

async function getGroupMemberInfo(): Promise<GroupMemberInfoResponse> {
  const response = await fetch(
    `${baseUrl}/api/group_member_info.php?id=${groupId}`,
  );

  return response.json();
}

async function updatePlayer(rsn: string) {
  const response = await fetch(
    `${baseUrl}/php/add_datapoint.php?player=${rsn}`,
  );

  console.log(response);
}

export default async function Home() {
  const groupMemberInfo = await getGroupMemberInfo();

  // Object.keys(groupMemberInfo.data.memberlist).forEach(updatePlayer);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-800 ">
      <table className="table-auto border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-4">RSN</th>
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

                return (
                  <tr key={rsn}>
                    <td className="border-b border-slate-700 p-4 text-slate-500">
                      <a
                        className="underline"
                        href={`https://templeosrs.com/player/overview.php?player=${rsn}`}
                        target="_blank"
                      >
                        {rsn}
                      </a>
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
