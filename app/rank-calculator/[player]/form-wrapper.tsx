'use client';

import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rank } from '@/config/enums';
import { RankCalculator } from './rank-calculator';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';
import { Navigation } from '../components/navigation';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';
import { actionToastMessage } from '../utils/action-toast-message';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
}

export function FormWrapper({ formData, currentRank }: FormWrapperProps) {
  const {
    form,
    action: { executeAsync: saveDraftRankSubmission },
  } = useHookFormAction(
    saveDraftRankSubmissionAction,
    zodResolver(RankCalculatorSchema),
    {
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
        resetOptions: {
          keepIsSubmitted: true,
        },
      },
    },
  );
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <RankCalculator
        submitRankCalculatorAction={(e) => {
          e.preventDefault();

          actionToastMessage(handleSubmit(saveDraftRankSubmission)(e), {
            pending: 'Saving draft...',
            success: {
              render() {
                form.reset(form.getValues());

                return 'Draft saved!';
              },
            },
          });
        }}
        navigation={
          <Navigation
            actions={
              <RankCalculatorNavigationActions
                currentRank={currentRank}
                playerName={formData.playerName}
              />
            }
            shouldRenderBackButton
          />
        }
      />
    </FormProvider>
  );
}
