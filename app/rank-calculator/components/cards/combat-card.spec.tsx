import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { combatExpectedValues } from '@/fixtures/rank-calculator/combat-expected-values';
import { CombatCard } from './combat-card';
import { formatPercentage } from '../../utils/format-percentage';
import { formatNumber } from '../../utils/format-number';

generateScaledPlayerTests(
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
        formatNumber(expected.pointsAwarded),
      );
    });

    it('renders the points remaining', () => {
      if (expected.pointsRemaining === 0) {
        expect(
          screen.getByLabelText(/^combat points remaining$/i).textContent,
        ).toBe('Completed');
      } else {
        expect(
          screen.getByLabelText(/^combat points remaining$/i).textContent,
        ).toBe(`(${formatNumber(expected.pointsRemaining)})`);
      }
    });

    it('renders the point competion percentage', () => {
      expect(
        screen.getByLabelText(/^combat point completion percentage$/i)
          .textContent,
      ).toBe(formatPercentage(expected.pointsAwardedPercentage));
    });

    it('renders the EHB points', () => {
      expect(
        screen.getByLabelText(/^efficient hours bossed points$/i).textContent,
      ).toBe(formatNumber(expected.ehbPoints));
    });

    it('renders the combat achievement tier points', () => {
      expect(
        screen.getByLabelText(/^combat achievement tier points$/i).textContent,
      ).toBe(formatNumber(expected.combatAchievementTierPoints));
    });

    it('renders the EHB value', () => {
      expect(
        screen.getByLabelText(/^efficient hours bossed value$/i).textContent,
      ).toBe(`${formData.ehb}`);
    });

    it('renders the combat achievement tier value', () => {
      expect(
        screen.getByRole('combobox', { name: /combat achievement tier value/i })
          .textContent,
      ).toBe(formData.combatAchievementTier);
    });
  },
);
