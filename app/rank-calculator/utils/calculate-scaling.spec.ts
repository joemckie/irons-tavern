import { it, expect } from '@jest/globals';
import { sub } from 'date-fns';
import { calculateScaling } from './calculate-scaling';

it('returns 10 if the date is today', () => {
  expect(calculateScaling(new Date())).toEqual(10);
});

it('returns 40 is the date is 60 days prior', () => {
  expect(
    calculateScaling(
      sub(new Date(), {
        days: 60,
      }),
    ),
  ).toEqual(40);
});

it('returns 70 if the date is 120 days prior', () => {
  expect(
    calculateScaling(
      sub(new Date(), {
        days: 120,
      }),
    ),
  ).toEqual(70);
});

it('returns 100 if the date is 180 days prior', () => {
  expect(
    calculateScaling(
      sub(new Date(), {
        days: 180,
      }),
    ),
  ).toEqual(100);
});
