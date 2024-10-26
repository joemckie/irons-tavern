import { it, expect } from '@jest/globals';
import { render, screen } from '@/test-utils/testing-library';
import { earlyGamePlayerFormData } from '@/fixtures/rank-calculator/early-game-player-form-data';
import { notableItemsExpectedValues } from '@/fixtures/rank-calculator/notable-items-expected-values';
import { FormProvider, useForm } from 'react-hook-form';
import { NotableItemsCard } from '../../components/cards/notable-items-card';

function Wrapper() {
  const form = useForm({
    defaultValues: earlyGamePlayerFormData,
  });

  return (
    <FormProvider {...form}>
      <NotableItemsCard />
    </FormProvider>
  );
}

it('calculates the total points', async () => {
  render(<Wrapper />);

  expect(
    await screen.findByLabelText(/^total notable items points$/i),
  ).toHaveTextContent(
    `${notableItemsExpectedValues.earlyGamePlayer.fullScaling.pointsAwarded}`,
  );
});

it('calculates the points remaining', async () => {
  render(<Wrapper />);

  expect(
    await screen.findByLabelText(/^notable items points remaining$/i),
  ).toHaveTextContent(
    `(${notableItemsExpectedValues.earlyGamePlayer.fullScaling.pointsRemaining})`,
  );
});

it('calculates the point competion percentage', async () => {
  render(<Wrapper />);

  expect(
    await screen.findByLabelText(
      /^notable items point completion percentage$/i,
    ),
  ).toHaveTextContent(
    `${notableItemsExpectedValues.earlyGamePlayer.fullScaling.pointsAwardedPercentage}%`,
  );
});

it('calculates the items collected', async () => {
  render(<Wrapper />);

  expect(
    await screen.findByLabelText(/^notable items collected$/i),
  ).toHaveTextContent('5');
});

it('calculates the total items available', async () => {
  render(<Wrapper />);

  expect(
    await screen.findByLabelText(/^total notable items available$/i),
  ).toHaveTextContent('295');
});

it('calculates the collected items percentage', async () => {
  render(<Wrapper />);

  expect(
    await screen.findByLabelText(/^notable items collected percentage$/i),
  ).toHaveTextContent('1.69%');
});
