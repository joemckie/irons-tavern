import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '../../checkbox';

export function AchievementDiaryCapeCheckbox() {
  const { getValues, setValue } = useFormContext<RankCalculatorSchema>();
  const [hasAchievementDiaryCape, achievementDiaries] = getValues([
    'hasAchievementDiaryCape',
    'achievementDiaries',
  ]);
  const allDiariesElite = Object.values(achievementDiaries).every(
    (tier) => tier === 'Elite',
  );

  useEffect(() => {
    if (allDiariesElite && !hasAchievementDiaryCape) {
      setValue('hasAchievementDiaryCape', true);
    }

    if (!allDiariesElite && hasAchievementDiaryCape) {
      setValue('hasAchievementDiaryCape', false);
    }
  }, [allDiariesElite, hasAchievementDiaryCape, setValue]);

  return (
    <Checkbox
      name="hasAchievementDiaryCape"
      checked={hasAchievementDiaryCape}
    />
  );
}
