import * as Sentry from '@sentry/nextjs';
import { fetchTempleGroupCollectionLog } from '@/app/rank-calculator/data-sources/fetch-player-details/fetch-temple-group-collection-log';
import { getWikiSyncData } from '@/app/rank-calculator/data-sources/fetch-player-details/get-wikisync-data';
import type { WikiSyncResponse } from '@/app/schemas/wiki';
import { NextResponse } from 'next/server';
import type {
  TempleOSRSGroupMemberInfo,
  TransformedGroupCollectionLogItem,
} from '@/app/schemas/temple-api';
import { fetchTempleGroupMemberInfo } from '@/app/rank-calculator/data-sources/fetch-temple-group-member-info';

export async function GET() {
  try {
    const groupCollectionLog = await fetchTempleGroupCollectionLog();

    if (!groupCollectionLog) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch group collection log',
      });
    }

    const groupMemberData = groupCollectionLog.members.reduce<
      Record<
        string,
        {
          playerNameWithCapitalisation: string;
          collectionLogItems: Record<string, TransformedGroupCollectionLogItem>;
          playerStats:
            | TempleOSRSGroupMemberInfo['data']['memberlist'][string]
            | null;
          wikiSyncData: WikiSyncResponse | null;
        }
      >
    >((acc, val) => {
      acc[val.player.toLowerCase()] = {
        playerNameWithCapitalisation: val.player_name_with_capitalization,
        collectionLogItems: val.items,
        wikiSyncData: null,
        playerStats: null,
      };

      return acc;
    }, {});

    await Promise.all(
      Object.keys(groupMemberData).map(async (player) => {
        groupMemberData[player].wikiSyncData = await getWikiSyncData(player);
      }),
    );

    const groupMemberInfo = await fetchTempleGroupMemberInfo();

    if (!groupMemberInfo) {
      throw new Error('Unable to fetch group member info');
    }

    Object.entries(groupMemberInfo).forEach(([player, info]) => {
      if (groupMemberData[player.toLowerCase()]) {
        groupMemberData[player.toLowerCase()].playerStats = info;
      }
    });

    return NextResponse.json({
      success: true,
      data: groupMemberData,
    });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({
      success: false,
    });
  }
}
