import { render, screen } from '@/test-utils/testing-library';
import * as formDataMocks from '@/mocks/misc/form-data';
import { MockFormProvider } from '@/test-utils/mock-form-provider';
import { generateScaledPlayerTests } from '@/test-utils/generated-scaled-player-tests';
import { skillingExpectedValues } from '@/fixtures/rank-calculator/skilling-expected-values';
import { DiaryLocation } from '@/app/schemas/osrs';
import { SkillingCard } from './skilling-card';
import { formatPercentage } from '../../utils/format-percentage';
import { formatNumber } from '../../utils/format-number';

generateScaledPlayerTests(
  formDataMocks,
  skillingExpectedValues,
  (formData, expected) => {
    beforeEach(async () => {
      render(
        <MockFormProvider defaultValues={formData}>
          <SkillingCard />
        </MockFormProvider>,
      );

      await screen.findByRole('heading', { name: /skilling/i });
    });

    it('renders the total points', () => {
      expect(
        screen.getByLabelText(/^total skilling points$/i).textContent,
      ).toBe(formatNumber(expected.pointsAwarded));
    });

    it('renders the points remaining', () => {
      if (expected.pointsRemaining === 0) {
        expect(
          screen.getByLabelText(/^skilling points remaining$/i).textContent,
        ).toBe('Completed');
      } else {
        expect(
          screen.getByLabelText(/^skilling points remaining$/i).textContent,
        ).toBe(`(${formatNumber(expected.pointsRemaining)})`);
      }
    });

    it('renders the point competion percentage', () => {
      expect(
        screen.getByLabelText(/^skilling point completion percentage$/i)
          .textContent,
      ).toBe(formatPercentage(expected.pointsAwardedPercentage));
    });

    it('renders the EHP points', () => {
      expect(
        screen.getByLabelText(/^efficient hours played points$/i).textContent,
      ).toBe(formatNumber(expected.ehpPoints));
    });

    it('renders the EHP value', () => {
      expect(
        screen.getByLabelText(/^efficient hours played value$/i).textContent,
      ).toBe(`${formData.ehp}`);
    });

    it('renders the total level points', () => {
      expect(screen.getByLabelText(/^total level points$/i).textContent).toBe(
        formatNumber(expected.totalLevelPoints),
      );
    });

    it('renders the total level value', () => {
      expect(screen.getByLabelText(/^total level value$/i).textContent).toBe(
        `${formData.totalLevel}`,
      );
    });

    it('renders the achievement diary points', () => {
      Object.entries(expected.achievementDiariesPoints).forEach(
        ([diaryLocation, points]) => {
          const matcher = new RegExp(`${diaryLocation} diary points`, 'i');

          expect(screen.getByLabelText(matcher).textContent).toBe(
            formatNumber(points),
          );
        },
      );
    });

    it('renders the achievement diary values', () => {
      Object.keys(expected.achievementDiariesPoints).forEach(
        (diaryLocation) => {
          const matcher = new RegExp(`${diaryLocation} diary value`, 'i');

          expect(
            screen.getByRole('combobox', { name: matcher }).textContent,
          ).toBe(
            `${formData.achievementDiaries[diaryLocation as DiaryLocation]}`,
          );
        },
      );
    });
  },
);
