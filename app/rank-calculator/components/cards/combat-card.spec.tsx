import { it, expect } from '@jest/globals';
import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/fixtures/rank-calculator/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generatePlayerTests } from '@/test-utils/generate-player-tests';
import { combatExpectedValues } from '@/fixtures/rank-calculator/combat-expected-values';
import { CombatCard } from './combat-card';

generatePlayerTests(
  formDataMocks,
  combatExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData}>
          <CombatCard />
        </MockFormProvider>,
      );

      await screen.findByRole('heading', { name: /combat/i });
    });

    it('renders the total points', () => {
      expect(screen.getByLabelText(/^total combat points$/i).textContent).toBe(
        `${expected.pointsAwarded}`,
      );
    });

    it('renders the points remaining', () => {
      expect(
        screen.getByLabelText(/^combat points remaining$/i).textContent,
      ).toBe(`(${expected.pointsRemaining})`);
    });

    it('renders the point competion percentage', () => {
      expect(
        screen.getByLabelText(/^combat point completion percentage$/i)
          .textContent,
      ).toBe(`${expected.pointsAwardedPercentage}%`);
    });

    it('renders the EHB points', () => {
      expect(
        screen.getByLabelText(/^efficient hours bossed points$/i).textContent,
      ).toBe(`${expected.ehbPoints}%`);
    });

    it('renders the combat achievement tier points', () => {
      expect(
        screen.getByLabelText(/^combat achievement tier points$/i).textContent,
      ).toBe(`${expected.caTierPoints}%`);
    });
  },
);
