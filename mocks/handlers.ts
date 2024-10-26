import { constants } from '@/config/constants';
import { http, HttpResponse, passthrough } from 'msw';
import { WikiSyncResponse } from '@/types/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { CollectionLogResponse } from '@/types/collection-log';
import { PlayerStatsResponse } from '@/types/temple-api';
import * as endGamePlayerFixture from './end-game-player';
import * as midGamePlayerFixture from './mid-game-player';
import * as earlyGamePlayerFixture from './early-game-player';
import { memberListFixture } from './misc/member-list';
import { combatAchievementListFixture } from './wiki-data/combat-achievement-list';
import { combatAchievementTierFixture } from './wiki-data/combat-achievement-tiers';

const templePlayerStatsHandler = http.get(
  'https://templeosrs.com/api/player_stats.php',
  ({ request }) => {
    const url = new URL(request.url);
    const player = url.searchParams.get('player');

    switch (player?.toLowerCase()) {
      case 'riftletics':
        return HttpResponse.json<PlayerStatsResponse>(
          earlyGamePlayerFixture.templePlayerStatsResponse,
        );
      case 'clogging':
        return HttpResponse.json<PlayerStatsResponse>(
          endGamePlayerFixture.templePlayerStatsResponse,
        );
      default:
        return HttpResponse.json<PlayerStatsResponse>(
          midGamePlayerFixture.templePlayerStatsResponse,
        );
    }
  },
);

const collectionLogHandler = http.get(
  `${constants.collectionLogBaseUrl}/collectionlog/user/:player`,
  ({ params }: { params: { player: string } }) => {
    switch (params.player.toLowerCase()) {
      case 'riftletics':
        return HttpResponse.json<CollectionLogResponse>(
          earlyGamePlayerFixture.collectionLogResponse,
        );
      case 'clogging':
        return HttpResponse.json<CollectionLogResponse>(
          endGamePlayerFixture.collectionLogResponse,
        );
      default:
        return HttpResponse.json<CollectionLogResponse>(
          midGamePlayerFixture.collectionLogResponse,
        );
    }
  },
);

const wikiSyncHandler = http.get(
  `${constants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
  ({ params }: { params: { player: string } }) => {
    switch (params.player.toLowerCase()) {
      case 'riftletics':
        return HttpResponse.json<WikiSyncResponse>(
          earlyGamePlayerFixture.wikiSyncResponse,
        );
      case 'clogging':
        return HttpResponse.json<WikiSyncResponse>(
          endGamePlayerFixture.wikiSyncResponse,
        );
      default:
        return HttpResponse.json<WikiSyncResponse>(
          midGamePlayerFixture.wikiSyncResponse,
        );
    }
  },
);

const wikiApiHandler = http.get(
  `${constants.wiki.baseUrl}/api.php`,
  ({ request }) => {
    if (request.url.includes('Combat+Achievement+JSON')) {
      return HttpResponse.json(combatAchievementListFixture);
    }

    if (request.url.includes('ca+easy+points')) {
      return HttpResponse.json(combatAchievementTierFixture);
    }

    return HttpResponse.json(`No mock provided for ${request.url}`, {
      status: 404,
    });
  },
);

const memberListHandler = http.get(
  'https://*.public.blob.vercel-storage.com/members-*.json',
  () => HttpResponse.json<ClanMember[]>(memberListFixture),
);

const passthroughHandlers = [
  'https://*.googleapis.com/*',
  'https://*.gstatic.com/*',
  `${constants.publicUrl}/api/*`,
  'https://oldschool.runescape.wiki/images/*',
  `${constants.redisUrl}/*`,
].map((url) => http.all(url, () => passthrough()));

export const handlers = [
  collectionLogHandler,
  wikiSyncHandler,
  templePlayerStatsHandler,
  memberListHandler,
  wikiApiHandler,
  ...passthroughHandlers,
];
