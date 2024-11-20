'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rank } from '@/config/enums';
import { RankCalculator } from './rank-calculator';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';
import { Navigation } from '../components/navigation';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';
import { handleToastUpdates } from '../utils/handle-toast-updates';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
  hasSavedData: boolean;
}

export function FormWrapper({
  formData,
  currentRank,
  hasSavedData,
}: FormWrapperProps) {
  const {
    form,
    action: {
      executeAsync: saveDraftRankSubmission,
      isExecuting,
      isTransitioning,
    },
  } = useHookFormAction(
    saveDraftRankSubmissionAction,
    zodResolver(RankCalculatorSchema),
    {
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
      },
    },
  );
  const [prevHasSavedData, setPrevHasSavedData] = useState(hasSavedData);

  if (hasSavedData !== prevHasSavedData) {
    setPrevHasSavedData(hasSavedData);
  }

  useEffect(() => {
    if (prevHasSavedData !== hasSavedData) {
      // Resets the form when the user deletes their data
      form.reset(formData);
    }
  }, [prevHasSavedData, hasSavedData, form, formData]);

  const submitRankCalculator = form.handleSubmit(async (data) =>
    handleToastUpdates(saveDraftRankSubmission(data), {
      pending: 'Saving draft...',
      success: {
        render() {
          form.reset(data, {
            keepIsSubmitSuccessful: true,
          });

          return 'Draft saved!';
        },
      },
    }),
  );

  return (
    <FormProvider {...form}>
      <RankCalculator
        submitRankCalculatorAction={submitRankCalculator}
        navigation={
          <Navigation
            actions={
              <RankCalculatorNavigationActions
                currentRank={currentRank}
                playerName={formData.playerName}
                isActionActive={isExecuting || isTransitioning}
              />
            }
            shouldRenderBackButton
          />
        }
      />
    </FormProvider>
  );
}
