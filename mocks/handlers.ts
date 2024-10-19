import { constants } from '@/config/constants';
import { http, HttpResponse } from 'msw';
import collectionLogFixture from '@/fixtures/collection-log.fixture.json';
import wikiSyncFixture from '@/fixtures/wikisync.fixture.json';
import { WikiSyncResponse } from '@/types/wiki';
import { ClanMember } from '@/app/api/update-member-list/route';
import { Rank } from '@/config/enums';
import { CollectionLogResponse } from '@/types/collection-log';

export const handlers = [
  http.get(
    `${constants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
    () => HttpResponse.json<WikiSyncResponse>(wikiSyncFixture),
  ),
  http.get(`${constants.collectionLogBaseUrl}/collectionlog/user/:player`, () =>
    HttpResponse.json<CollectionLogResponse>(collectionLogFixture),
  ),
  http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
    HttpResponse.json<ClanMember[]>([
      {
        rsn: 'cousinofkos',
        joinedDate: '31-08-2021',
        rank: Rank.Warlock,
      },
    ]),
  ),
];
