import { FormData } from '@/types/rank-calculator';

interface FormDataMap {
  earlyGamePlayer: FormData;
  midGamePlayer: FormData;
  endGamePlayer: FormData;
}

export const generatePlayerTests = (
  formData: FormDataMap,
  testRunner: (formFixture: FormData) => void,
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
