export function calculateRaidsCapePoints(totalCapePoints: number, totalKcForMaxCape: number, totalKcForTargetCape: number) {
  return (totalCapePoints / totalKcForMaxCape) * totalKcForTargetCape;
}
