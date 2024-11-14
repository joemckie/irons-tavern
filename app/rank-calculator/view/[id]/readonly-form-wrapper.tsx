'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { RankCalculator } from '../../[player]/rank-calculator';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
}

export function ReadonlyFormWrapper({ formData }: FormWrapperProps) {
  const methods = useForm<Omit<RankCalculatorSchema, 'rank' | 'points'>>({
    disabled: true,
    values: formData,
  });

  return (
    <FormProvider {...methods}>
      <RankCalculator submitRankCalculatorAction={() => {}} />
    </FormProvider>
  );
}
