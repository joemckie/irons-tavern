import { TzHaarCape } from '@/app/schemas/osrs';
import Decimal from 'decimal.js-light';

export function calculateTzhaarCapePoints(cape: TzHaarCape, scaling: number) {
  const basePoints =
    (cape === 'Fire cape' && 500) || (cape === 'Infernal cape' && 7000) || 0;

  return new Decimal(basePoints).times(scaling).toNumber();
}
