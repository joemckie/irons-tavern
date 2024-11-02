import { FormData } from '@/types/rank-calculator';

interface FormDataMap {
  earlyGamePlayer: Omit<FormData, 'rank' | 'points'>;
  midGamePlayer: Omit<FormData, 'rank' | 'points'>;
  endGamePlayer: Omit<FormData, 'rank' | 'points'>;
}

export const generatePlayerTests = (
  formData: FormDataMap,
  testRunner: (formFixture: Omit<FormData, 'rank' | 'points'>) => void,
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
