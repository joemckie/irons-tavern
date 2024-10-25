import { differenceInDays } from 'date-fns';

export function calculateScaling(joinDate: Date | null) {
  const today = new Date();
  const maxScalingAfterXDays = 180;
  const width = 15;
  const minScaling = 0.1;
  const scalingStep = (width / maxScalingAfterXDays) * (1 - minScaling);
  const dayOffset = 1; // We count the first day in clan as day 1
  const daysSinceJoined =
    differenceInDays(today, joinDate ?? new Date()) + dayOffset;
  const unclippedScaling = Number(
    (Math.floor(daysSinceJoined / width) * scalingStep + minScaling).toFixed(3),
  );
  const actualScalingFactor = Math.min(
    1,
    Math.max(unclippedScaling, minScaling),
  );

  return actualScalingFactor;
}
