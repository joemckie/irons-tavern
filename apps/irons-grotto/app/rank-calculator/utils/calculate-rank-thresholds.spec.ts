import { calculateRankThresholds } from './calculate-rank-thresholds';

it('calculates the rank thresholds correctly', () => {
  const maximumAvailablePoints = 228530;
  const rankThresholds = calculateRankThresholds(maximumAvailablePoints);

  expect(rankThresholds).toEqual<typeof rankThresholds>({
    Standard: {
      Air: 0,
      Pine: 1,
      Water: 3000,
      Oak: 9000,
      Earth: 17000,
      Willow: 29000,
      Nature: 42000,
      Maple: 59000,
      Law: 80000,
      Yew: 106000,
      Achiever: 137000,
      Elite: 181000,
      Diseased: 223000,
      Blisterwood: 273000,
    },
    Legacy: { Legend: 0 },
    Admin: { Defiler: 0, Onyx: 137000 },
    Moderator: { Pure: 0, Zenyte: 137000 },
    'Deputy Owner': { 'Deputy Owner': 0 },
    Owner: { Owner: 0 },
  });
});
