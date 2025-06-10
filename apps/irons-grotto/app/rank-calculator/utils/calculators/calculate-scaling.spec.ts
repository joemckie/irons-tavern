import { sub } from 'date-fns';
import { calculateScaling } from './calculate-scaling';

it('returns 0.1 if there is no join date', () => {
  expect(calculateScaling(null)).toEqual(0.1);
});

it('returns 0.1 if the date is today', () => {
  expect(calculateScaling(new Date())).toEqual(0.1);
});

it('returns 0.4 if the date is 60 days prior', () => {
  expect(
    calculateScaling(
      sub(new Date(), {
        days: 60,
      }),
    ),
  ).toEqual(0.4);
});

it('returns 0.7 if the date is 120 days prior', () => {
  expect(
    calculateScaling(
      sub(new Date(), {
        days: 120,
      }),
    ),
  ).toEqual(0.7);
});

it('returns 1 if the date is 180 days prior', () => {
  expect(
    calculateScaling(
      sub(new Date(), {
        days: 180,
      }),
    ),
  ).toEqual(1);
});
