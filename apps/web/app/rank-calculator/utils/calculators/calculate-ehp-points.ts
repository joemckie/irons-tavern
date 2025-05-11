export function calculateEhpPoints(ehp: number, scaling: number) {
  const pointsPerEhp = 10;
  const pointsAwarded = Math.floor(
    Number((ehp * pointsPerEhp * scaling).toFixed(3)),
  );

  return pointsAwarded;
}
