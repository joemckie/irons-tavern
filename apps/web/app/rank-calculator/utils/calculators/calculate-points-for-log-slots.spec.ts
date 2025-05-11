import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';

it('calculates the correct points for 1568 log slots', () => {
  const collectionLogSlotCount = 1568;
  const expectedPoints = 65440;

  const result = calculatePointsForLogSlots(collectionLogSlotCount, 1);

  expect(result).toEqual(expectedPoints);
});

it('calculates the correct points for 1560 log slots', () => {
  const collectionLogSlotCount = 1560;
  const expectedPoints = 64800;

  const result = calculatePointsForLogSlots(collectionLogSlotCount, 1);

  expect(result).toEqual(expectedPoints);
});
