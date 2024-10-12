import { constants } from '@/config/constants';

export const formatWikiImageUrl = (entityName: string) =>
  `${constants.wiki.baseUrl}/images/${entityName.replaceAll(' ', '_')}.png`;

export const formatWikiUrl = (entityName: string) =>
  `${constants.wiki.baseUrl}/w/${entityName.replaceAll(' ', '_')}`;
