import Decimal from 'decimal.js-light';

export function calculatePointsForLogSlots(
  collectionLogSlotCount: number,
  scaling: number,
) {
  const pointFactor = 5;
  const hundredsOfLogs = Math.floor(collectionLogSlotCount / 100);
  const remainder = new Decimal(collectionLogSlotCount).mod(100);
  const triangleNumber = new Decimal(hundredsOfLogs + 1)
    .times(hundredsOfLogs)
    .dividedBy(2);
  const pointsFromHundreds = new Decimal(triangleNumber).times(
    pointFactor * 100,
  );
  const pointsFromRemainder = new Decimal(remainder)
    .times(hundredsOfLogs + 1)
    .times(pointFactor);
  const sumOfPoints = pointsFromHundreds.add(pointsFromRemainder);
  const scaledPoints = sumOfPoints
    .times(scaling)
    .toDecimalPlaces(0, Decimal.ROUND_FLOOR)
    .toNumber();

  return scaledPoints;
}
