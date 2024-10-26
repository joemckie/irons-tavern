import { it, expect } from '@jest/globals';
import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/fixtures/rank-calculator/form-data';
import { notableItemsExpectedValues } from '@/fixtures/rank-calculator/notable-items-expected-values';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generatePlayerTests } from '@/test-utils/generate-player-tests';
import { NotableItemsCard } from './notable-items-card';

generatePlayerTests(
  formDataMocks,
  notableItemsExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData}>
          <NotableItemsCard />
        </MockFormProvider>,
      );

      await screen.findByText(/notable items/i);
    });

    it('renders the total points', async () => {
      expect(
        screen.getByLabelText(/^total notable items points$/i).textContent,
      ).toBe(`${expected.pointsAwarded}`);
    });

    it('renders the points remaining', async () => {
      expect(
        screen.getByLabelText(/^notable items points remaining$/i).textContent,
      ).toBe(`(${expected.pointsRemaining})`);
    });

    it('renders the point competion percentage', async () => {
      expect(
        screen.getByLabelText(/^notable items point completion percentage$/i)
          .textContent,
      ).toBe(`${expected.pointsAwardedPercentage}%`);
    });

    it('renders the items collected', async () => {
      expect(
        screen.getByLabelText(/^notable items collected$/i).textContent,
      ).toBe(`${expected.itemsCollected}`);
    });

    it('renders the total items available', async () => {
      expect(
        screen.getByLabelText(/^total notable items available$/i).textContent,
      ).toBe('295');
    });

    it('renders the collected items percentage', async () => {
      expect(
        screen.getByLabelText(/^notable items collected percentage$/i)
          .textContent,
      ).toBe(`${expected.percentageCollected}%`);
    });
  },
);
