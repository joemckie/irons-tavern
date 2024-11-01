'use client';

import { FormData } from '@/types/rank-calculator';
import { FormProvider, useForm } from 'react-hook-form';
import { RankCalculator } from './rank-calculator';

interface FormWrapperProps {
  formData: Omit<FormData, 'rank' | 'points'>;
}

export function FormWrapper({ formData }: FormWrapperProps) {
  const methods = useForm<FormData>({
    defaultValues: formData,
  });

  return (
    <FormProvider {...methods}>
      <RankCalculator />
    </FormProvider>
  );
}
