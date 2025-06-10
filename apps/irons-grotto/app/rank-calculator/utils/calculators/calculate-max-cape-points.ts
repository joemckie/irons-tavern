import { pointsConfig } from '../../config/points';

export function calculateMaxCapePoints(hasMaxCape: boolean, scaling: number) {
  return hasMaxCape ? pointsConfig.maxCapePoints * scaling : 0;
}
