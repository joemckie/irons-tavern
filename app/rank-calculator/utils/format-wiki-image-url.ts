import { constants } from '@/config/constants';

export const formatWikiImageUrl = (entityName: string) =>
  `${constants.wiki.baseUrl}/images/${entityName.replaceAll(' ', '_')}.png`;
