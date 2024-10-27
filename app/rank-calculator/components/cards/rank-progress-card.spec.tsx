import { it, expect } from '@jest/globals';
import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { rankExpectedValues } from '@/fixtures/rank-calculator/rank-expected-values';
import { RankProgressCard } from './rank-progress-card';

generateScaledPlayerTests(
  formDataMocks,
  rankExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData}>
          <RankProgressCard />
        </MockFormProvider>,
      );

      await screen.findByRole('heading', { name: /rank/i });
    });

    it('renders the total points', () => {
      expect(screen.getByLabelText(/total points/i).textContent).toBe(
        `${expected.pointsAwarded}`,
      );
    });

    it('renders the points to the next rank', () => {
      expect(screen.getByLabelText(/points to next rank/i).textContent).toBe(
        `(${expected.pointsRemaining})`,
      );
    });

    it('renders the current rank', () => {
      expect(screen.getByLabelText(/current rank/i).textContent).toBe(
        expected.rank,
      );
    });

    it('renders the current rank icon', () => {
      const matcher = new RegExp(`${expected.rank} icon`);
      expect(screen.getByAltText(matcher)).toHaveAttribute(
        'src',
        expect.stringContaining(`${expected.rank.toLowerCase()}.png`),
      );
    });

    it('renders the next rank', () => {
      expect(screen.getByLabelText(/next rank/i).textContent).toBe(
        expected.rank,
      );
    });

    it('renders the next rank icon', () => {
      const matcher = new RegExp(`${expected.nextRank} icon`);
      expect(screen.getByAltText(matcher)).toHaveAttribute(
        'src',
        expect.stringContaining(`${expected.nextRank.toLowerCase()}.png`),
      );
    });

    it('renders the selected rank structure', () => {
      expect(
        screen.getByRole('combobox', { name: /selected rank structure/i })
          .textContent,
      ).toBe(formData.rankStructure);
    });
  },
);
