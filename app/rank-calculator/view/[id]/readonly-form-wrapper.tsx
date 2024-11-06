'use client';

import { FormData } from '@/types/rank-calculator';
import { FormProvider, useForm } from 'react-hook-form';
import { RankCalculator } from '../../[player]/rank-calculator';

interface FormWrapperProps {
  formData: Omit<FormData, 'rank' | 'points'>;
}

export function ReadonlyFormWrapper({ formData }: FormWrapperProps) {
  const methods = useForm<Omit<FormData, 'rank' | 'points'>>({
    values: formData,
    disabled: true,
    shouldUnregister: false,
  });

  return (
    <FormProvider {...methods}>
      <RankCalculator submitRankCalculatorAction={() => {}} />
    </FormProvider>
  );
}
