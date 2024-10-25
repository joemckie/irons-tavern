import { differenceInDays } from 'date-fns';

export function calculateScaling(joinDate: Date | null) {
  const today = new Date();
  const maxScalingAfterXDays = 180;
  const width = 15;
  const minScaling = 0.1;
  const scalingStep = (width / maxScalingAfterXDays) * (1 - minScaling);
  const daysSinceJoined = differenceInDays(today, joinDate ?? new Date());
  const unclippedScaling = Number(
    (Math.floor(daysSinceJoined / width) * scalingStep + minScaling).toFixed(3),
  );
  const actualScalingFactor = Math.min(
    1,
    Math.max(unclippedScaling, minScaling),
  );

  return actualScalingFactor;
}
