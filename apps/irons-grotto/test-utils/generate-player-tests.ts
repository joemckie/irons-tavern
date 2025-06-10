import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';

interface FormDataMap {
  earlyGamePlayer: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  midGamePlayer: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  endGamePlayer: Omit<RankCalculatorSchema, 'rank' | 'points'>;
}

export const generatePlayerTests = (
  formData: FormDataMap,
  testRunner: (
    formFixture: Omit<RankCalculatorSchema, 'rank' | 'points'>,
  ) => void,
) => {
  describe('Early-game player', () => {
    testRunner(formData.earlyGamePlayer);
  });

  describe('Mid-game player', () => {
    testRunner(formData.midGamePlayer);
  });

  describe('End-game player', () => {
    testRunner(formData.endGamePlayer);
  });
};
