import { constants } from '@/config/constants';
import { http, HttpResponse } from 'msw';
import { WikiSyncResponse } from '@/types/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { CollectionLogResponse } from '@/types/collection-log';
import { PlayerStatsResponse } from '@/types/temple-api';
import * as lateGamePlayerFixture from './late-game-player';
import * as midGamePlayerFixture from './mid-game-player';
import { memberListFixture } from './misc/member-list';

export const handlers = [
  http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
    HttpResponse.json<ClanMember[]>(memberListFixture as ClanMember[]),
  ),
  http.get(
    `${constants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
    () =>
      HttpResponse.json<WikiSyncResponse>(
        midGamePlayerFixture.wikiSyncResponse,
      ),
  ),
  http.get(`${constants.collectionLogBaseUrl}/collectionlog/user/:player`, () =>
    HttpResponse.json<CollectionLogResponse>(
      midGamePlayerFixture.collectionLogResponse,
    ),
  ),

  http.get('https://templeosrs.com/api/player_stats.php', ({ request }) => {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');

    switch (player?.toLowerCase()) {
      case 'clogging':
        return HttpResponse.json<PlayerStatsResponse>(
          lateGamePlayerFixture.templeStatsResponse,
        );
      default:
        return HttpResponse.json<PlayerStatsResponse>(
          midGamePlayerFixture.templeStatsResponse,
        );
    }
  }),

  // Maxed player fixtures
  http.get(
    `${constants.wikiSync.baseUrl}/runelite/player/clogging/STANDARD`,
    () =>
      HttpResponse.json<WikiSyncResponse>(
        lateGamePlayerFixture.wikiSyncResponse,
      ),
  ),
  http.get(
    `${constants.collectionLogBaseUrl}/collectionlog/user/clogging`,
    () =>
      HttpResponse.json<CollectionLogResponse>(
        lateGamePlayerFixture.collectionLogResponse,
      ),
  ),
];
