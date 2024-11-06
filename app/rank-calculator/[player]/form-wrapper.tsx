'use client';

import { FormData } from '@/types/rank-calculator';
import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { submitRankCalculatorAction } from './submit-rank-calculator-action';
import { RankCalculator } from './rank-calculator';
import { submitRankCalculatorSchema } from './submit-rank-calculator-validation';

interface FormWrapperProps {
  formData: Omit<FormData, 'rank' | 'points'>;
}

export function FormWrapper({ formData }: FormWrapperProps) {
  const { handleSubmitWithAction, form } = useHookFormAction(
    submitRankCalculatorAction,
    zodResolver(submitRankCalculatorSchema),
    {
      actionProps: {
        onSuccess() {
          toast.success('Rank application submitted!');
        },
        onError() {
          toast.error('Form submission failed!');
        },
      },
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
      },
    },
  );

  return (
    <FormProvider {...form}>
      <RankCalculator submitRankCalculatorAction={handleSubmitWithAction} />
    </FormProvider>
  );
}
