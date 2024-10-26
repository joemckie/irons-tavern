import { it, expect } from '@jest/globals';
import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/fixtures/rank-calculator/form-data';
import { notableItemsExpectedValues } from '@/fixtures/rank-calculator/notable-items-expected-values';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { NotableItemsCard } from './notable-items-card';

generateScaledPlayerTests(
  formDataMocks,
  notableItemsExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData}>
          <NotableItemsCard />
        </MockFormProvider>,
      );

      await screen.findByRole('heading', { name: /notable items/i });
    });

    it('renders the total points', () => {
      expect(
        screen.getByLabelText(/^total notable items points$/i).textContent,
      ).toBe(`${expected.pointsAwarded}`);
    });

    it('renders the points remaining', () => {
      expect(
        screen.getByLabelText(/^notable items points remaining$/i).textContent,
      ).toBe(`(${expected.pointsRemaining})`);
    });

    it('renders the point competion percentage', () => {
      expect(
        screen.getByLabelText(/^notable items point completion percentage$/i)
          .textContent,
      ).toBe(`${expected.pointsAwardedPercentage}%`);
    });

    it('renders the items collected', () => {
      expect(
        screen.getByLabelText(/^notable items collected$/i).textContent,
      ).toBe(`${expected.itemsCollected}`);
    });

    it('renders the total items available', () => {
      expect(
        screen.getByLabelText(/^total notable items available$/i).textContent,
      ).toBe('295');
    });

    it('renders the collected items percentage', () => {
      expect(
        screen.getByLabelText(/^notable items collected percentage$/i)
          .textContent,
      ).toBe(`${expected.percentageCollected}%`);
    });
  },
);
