import { clientConstants } from '@/config/constants.client';

export const formatWikiImageUrl = (
  entityName: string,
  type: 'item' | 'category' = 'item',
) => {
  const imageName = encodeURIComponent(entityName.replaceAll(' ', '_'));
  const size = type === 'category' ? 80 : 64;

  return `${clientConstants.wiki.baseUrl}/images/thumb/${imageName}.png/${size}px-${imageName}.png`;
};
