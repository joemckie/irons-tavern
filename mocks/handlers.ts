import { constants } from '@/config/constants';
import { http, HttpResponse } from 'msw';
import collectionLogFixture from '@/fixtures/collection-log.fixture.json';
import wikiSyncFixture from '@/fixtures/wikisync.fixture.json';

export const handlers = [
  http.get(
    `${constants.wikiSync.baseUrl}/runelite/player/:player/STANDARD`,
    () => HttpResponse.json(wikiSyncFixture),
  ),
  http.get(`${constants.collectionLogBaseUrl}/collectionlog/user/:player`, () =>
    HttpResponse.json(collectionLogFixture),
  ),
];
