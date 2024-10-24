import { constants } from '@/config/constants';
import { http, HttpResponse } from 'msw';
import collectionLogFixture from '@/fixtures/collection-log.fixture.json';
import wikiSyncFixture from '@/fixtures/wikisync.fixture.json';
import templePlayerStats from '@/fixtures/temple-player-stats.fixture.json';
import memberListFixture from '@/fixtures/member-list.fixture.json';
import { WikiSyncResponse } from '@/types/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { CollectionLogResponse } from '@/types/collection-log';
import { PlayerStatsResponse } from '@/types/temple-api';
import * as maxedPlayerFixture from './maxed-player';

export const handlers = [
  http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
    HttpResponse.json<ClanMember[]>(memberListFixture as ClanMember[]),
  ),
  http.get(
    `${constants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
    () => HttpResponse.json<WikiSyncResponse>(wikiSyncFixture),
  ),
  http.get(`${constants.collectionLogBaseUrl}/collectionlog/user/:player`, () =>
    HttpResponse.json<CollectionLogResponse>(collectionLogFixture),
  ),

  http.get('https://templeosrs.com/api/player_stats.php', ({ request }) => {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');

    switch (player?.toLowerCase()) {
      case 'clogging':
        return HttpResponse.json<PlayerStatsResponse>(
          maxedPlayerFixture.templeStatsResponse,
        );
      default:
        return HttpResponse.json<PlayerStatsResponse>(templePlayerStats);
    }
  }),

  // Maxed player fixtures
  http.get(
    `${constants.wikiSync.baseUrl}/runelite/player/clogging/STANDARD`,
    () =>
      HttpResponse.json<WikiSyncResponse>(maxedPlayerFixture.wikiSyncResponse),
  ),
  http.get(
    `${constants.collectionLogBaseUrl}/collectionlog/user/clogging`,
    () =>
      HttpResponse.json<CollectionLogResponse>(
        maxedPlayerFixture.collectionLogResponse,
      ),
  ),
];
