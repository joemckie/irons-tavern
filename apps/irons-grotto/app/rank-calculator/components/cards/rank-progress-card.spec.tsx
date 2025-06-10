import { getImageProps } from 'next/image';
import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { rankExpectedValues } from '@/fixtures/rank-calculator/rank-expected-values';
import { RankProgressCard } from './rank-progress-card';
import { getRankName } from '../../utils/get-rank-name';
import { formatNumber } from '../../utils/format-number';
import { getRankImageUrl } from '../../utils/get-rank-image-url';

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

      await screen.findByText(/^total points$/i);
    });

    it('renders the total points', () => {
      expect(screen.getByLabelText(/^total points$/i).textContent).toBe(
        formatNumber(expected.pointsAwarded),
      );
    });

    it('renders the points to the next rank', () => {
      if (expected.pointsRemaining === 0) {
        expect(
          screen.getByLabelText(/^points to next rank$/i).textContent,
        ).toBe('Max rank');
      } else {
        expect(
          screen.getByLabelText(/^points to next rank$/i).textContent,
        ).toBe(`(${formatNumber(expected.pointsRemaining)})`);
      }
    });

    it('renders the current rank', () => {
      expect(screen.getByLabelText(/^current rank$/i).textContent).toBe(
        getRankName(expected.rank),
      );
    });

    it('renders the current rank icon', () => {
      const matcher = new RegExp(`^${expected.rank} icon$`);
      const { props: imageProps } = getImageProps({
        alt: '',
        src: getRankImageUrl(expected.rank),
        width: 22,
        height: 22,
      });

      expect(screen.getByAltText(matcher)).toHaveAttribute(
        'src',
        expect.stringContaining(imageProps.src),
      );
    });

    it('renders the next rank', () => {
      expect(screen.getByLabelText(/^next rank$/i).textContent).toBe(
        getRankName(expected.nextRank),
      );
    });

    it('renders the next rank icon', () => {
      const matcher = new RegExp(`^${expected.nextRank} icon$`);
      const { props: imageProps } = getImageProps({
        alt: '',
        src: getRankImageUrl(expected.nextRank),
        width: 22,
        height: 22,
      });

      expect(screen.getByAltText(matcher)).toHaveAttribute(
        'src',
        expect.stringContaining(imageProps.src),
      );
    });

    it('renders the selected rank structure', () => {
      expect(
        screen.getByRole('combobox', { name: /^selected rank structure$/i })
          .textContent,
      ).toBe(formData.rankStructure);
    });
  },
);
