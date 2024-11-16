'use client';

import { FormProvider } from 'react-hook-form';
import { mapToHookFormErrors } from '@next-safe-action/adapter-react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Rank } from '@/config/enums';
import { submitRankCalculatorAction } from './submit-rank-calculator-action';
import { RankCalculator } from './rank-calculator';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
}

export function FormWrapper({ formData, currentRank }: FormWrapperProps) {
  const { handleSubmitWithAction, form } = useHookFormAction(
    submitRankCalculatorAction.bind(null, currentRank),
    zodResolver(RankCalculatorSchema),
    {
      actionProps: {
        onSuccess() {
          toast.success('Rank application submitted!');
        },
        onError({ error: { validationErrors, serverError } }) {
          const errorMap = mapToHookFormErrors<typeof RankCalculatorSchema>(
            validationErrors,
            { joinBy: '\n' },
          );

          if (errorMap?.root) {
            toast.error(errorMap.root.message);
          }

          if (serverError) {
            toast.error('Form submission failed!');
          }
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
      <RankCalculator
        submitRankCalculatorAction={handleSubmitWithAction}
        navigationActions={<RankCalculatorNavigationActions />}
      />
    </FormProvider>
  );
}
