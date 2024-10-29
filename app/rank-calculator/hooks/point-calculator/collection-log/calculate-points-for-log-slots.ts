export function calculatePointsForLogSlots(
  collectionLogSlotCount: number,
  scaling: number,
) {
  const pointFactor = 5;
  const hundredsOfLogs = Math.floor(collectionLogSlotCount / 100);
  const remainder = collectionLogSlotCount % 100;
  const triangleNumber = (hundredsOfLogs * (hundredsOfLogs + 1)) / 2;
  const pointsFromHundreds = triangleNumber * (pointFactor * 100);
  const pointsFromRemainder = remainder * (hundredsOfLogs + 1) * pointFactor;
  const sumOfPoints = pointsFromHundreds + pointsFromRemainder;
  const scaledPoints = Math.floor(Number((sumOfPoints * scaling).toFixed(0)));

  return scaledPoints;
}
