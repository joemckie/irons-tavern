import { TzHaarCape } from '@/app/schemas/osrs';
import Decimal from 'decimal.js-light';
import { pointsConfig } from '../../config/points';

export function calculateTzhaarCapePoints(cape: TzHaarCape, scaling: number) {
  const { infernalCapePoints, fireCapePoints } = pointsConfig;
  const basePoints =
    (cape === 'Fire cape' && fireCapePoints) ||
    (cape === 'Infernal cape' && infernalCapePoints) ||
    0;

  return new Decimal(basePoints).times(scaling).toNumber();
}
