import { constants } from '@/config/constants';

export const formatWikiImageUrl = (
  entityName: string,
  type: 'item' | 'category' = 'item',
) => {
  const imageName = encodeURIComponent(entityName.replaceAll(' ', '_'));
  const size = type === 'category' ? 80 : 64;

  return `${constants.wiki.baseUrl}/images/thumb/${imageName}.png/${size}px-${imageName}.png`;
};
