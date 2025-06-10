import { TzHaarCape } from '@/app/schemas/osrs';

export function mergeTzhaarCapes(
  currentTzhaarCape: TzHaarCape,
  savedTzhaarCape: TzHaarCape | undefined,
) {
  if (
    !savedTzhaarCape ||
    TzHaarCape.options.indexOf(currentTzhaarCape) >
      TzHaarCape.options.indexOf(savedTzhaarCape)
  ) {
    return currentTzhaarCape;
  }

  return savedTzhaarCape;
}
