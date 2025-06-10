import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { collectionLogExpectedValues } from '@/fixtures/rank-calculator/collection-log-expected-values';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { CollectionLogCard } from './collection-log-card';
import { formatPercentage } from '../../utils/format-percentage';
import { formatNumber } from '../../utils/format-number';

generateScaledPlayerTests(
  formDataMocks,
  collectionLogExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData}>
          <CollectionLogCard />
        </MockFormProvider>,
      );

      await screen.findByRole('heading', { name: /collection log/i });
    });

    it('renders the total points', () => {
      expect(
        screen.getByLabelText(/^total collection log points$/i).textContent,
      ).toBe(formatNumber(expected.pointsAwarded));
    });

    it('renders the points remaining', () => {
      if (expected.pointsRemaining === 0) {
        expect(
          screen.getByLabelText(/^collection log points remaining$/i)
            .textContent,
        ).toBe('Completed');
      } else {
        expect(
          screen.getByLabelText(/^collection log points remaining$/i)
            .textContent,
        ).toBe(`(${formatNumber(expected.pointsRemaining)})`);
      }
    });

    it('renders the point competion percentage', () => {
      expect(
        screen.getByLabelText(/^collection log point completion percentage$/i)
          .textContent,
      ).toBe(formatPercentage(expected.pointsAwardedPercentage));
    });

    it('renders the collection log slot points', () => {
      expect(
        screen.getByLabelText(/^collection log slot points$/i).textContent,
      ).toBe(formatNumber(expected.collectionLogSlotPoints));
    });

    it('renders the collection log slot value', () => {
      expect(screen.getByLabelText(/^collection log count$/i).textContent).toBe(
        `${formData.collectionLogCount}`,
      );
    });
  },
);
