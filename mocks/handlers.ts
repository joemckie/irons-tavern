import { constants } from '@/config/constants';
import { http, HttpResponse, passthrough, PathParams } from 'msw';
import { WikiSyncResponse } from '@/types/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { CollectionLogResponse } from '@/types/collection-log';
import { PlayerStatsResponse } from '@/types/temple-api';
import { RedisKeyNamespace } from '@/config/redis';
import * as endGamePlayerFixture from './end-game-player';
import * as midGamePlayerFixture from './mid-game-player';
import * as earlyGamePlayerFixture from './early-game-player';
import * as formDataFixture from './misc/form-data';
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

const redisHandler = http.post<PathParams, [string, string][]>(
  `${constants.redisUrl}/pipeline`,
  async ({ request }) => {
    const [[, key]] = await request.json();

    switch (key) {
      case `${RedisKeyNamespace.Submission}:riftletics`:
        return HttpResponse.json([{ result: formDataFixture.earlyGamePlayer }]);
      case `${RedisKeyNamespace.Submission}:cousinofkos`:
        return HttpResponse.json([{ result: formDataFixture.midGamePlayer }]);
      case `${RedisKeyNamespace.Submission}:clogging`:
        return HttpResponse.json([{ result: formDataFixture.endGamePlayer }]);
      default:
        return HttpResponse.json(`No Redis mock provided for ${key}`, {
          status: 404,
        });
    }
  },
);

const passthroughHandlers = [
  'https://*.googleapis.com/*',
  'https://*.gstatic.com/*',
  `${constants.publicUrl}/api/*`,
  'https://oldschool.runescape.wiki/images/*',
].map((url) => http.all(url, () => passthrough()));

export const handlers = [
  collectionLogHandler,
  wikiSyncHandler,
  templePlayerStatsHandler,
  memberListHandler,
  wikiApiHandler,
  redisHandler,
  ...passthroughHandlers,
];
