export function calculateMaxCapePoints(hasMaxCape: boolean, scaling: number) {
  return hasMaxCape ? 7000 * scaling : 0;
}
