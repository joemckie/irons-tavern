'use client';

import { FormData } from '@/types/rank-calculator';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RankCalculator } from './rank-calculator';

interface FormWrapperProps {
  handleSubmitAction: SubmitHandler<FormData>;
  formData: Omit<FormData, 'rank' | 'points'>;
}

export function FormWrapper({
  formData,
  handleSubmitAction,
}: FormWrapperProps) {
  const methods = useForm<FormData>({
    defaultValues: formData,
  });

  return (
    <FormProvider {...methods}>
      <RankCalculator onSubmit={handleSubmitAction} />
    </FormProvider>
  );
}
