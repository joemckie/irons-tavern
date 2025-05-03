export function fractionToDecimal(fraction: string) {
  const [numerator, denominator] = fraction
    .replaceAll(',', '')
    .split('/')
    .map(Number);

  return numerator / denominator;
}
