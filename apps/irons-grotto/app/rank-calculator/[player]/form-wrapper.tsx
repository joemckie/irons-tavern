'use client';

import { FormProvider } from 'react-hook-form';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rank } from '@/config/enums';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { RankCalculator } from './rank-calculator';
import {
  RankCalculatorSchema,
  RankCalculatorValidator,
} from './submit-rank-calculator-validation';
import { RankCalculatorNavigationActions } from '../components/rank-calculator-navigation-actions';
import { Navigation } from '../components/navigation';
import { saveDraftRankSubmissionAction } from './actions/save-draft-rank-submission-action';
import { handleToastUpdates } from '../utils/handle-toast-updates';
import { CurrentPlayerProvider } from '../contexts/current-player-context';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  currentRank?: Rank;
  warnings: {
    templeCollectionLogNotFound: boolean;
    templeCollectionLogOutdated: boolean;
    wikiSyncNotFound: boolean;
  };
}

export function FormWrapper({
  formData,
  currentRank,
  warnings,
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
    zodResolver(RankCalculatorValidator),
    {
      formProps: {
        defaultValues: formData,
        criteriaMode: 'all',
        mode: 'onBlur',
      },
    },
  );

  const submitRankCalculator = form.handleSubmit(async (data) =>
    handleToastUpdates(saveDraftRankSubmission(data), {
      pending: 'Saving draft...',
      success: {
        render() {
          form.reset(data, { keepIsSubmitSuccessful: true });

          return 'Draft saved!';
        },
      },
    }),
  );

  useEffect(() => {
    if (warnings.templeCollectionLogOutdated) {
      toast.warning(
        'Please sync your collection log via the TempleOSRS RuneLite plugin!',
        { autoClose: false },
      );
    }

    if (warnings.templeCollectionLogNotFound) {
      toast.warning(
        'Please install the TempleOSRS RuneLite plugin to enable automatic notable item tracking!',
        { autoClose: false },
      );
    }

    if (warnings.wikiSyncNotFound) {
      toast.warning(
        'Please install the WikiSync RuneLite plugin to enable automatic tracking of CAs and diaries!',
        { autoClose: false },
      );
    }
  }, [
    warnings.templeCollectionLogOutdated,
    warnings.templeCollectionLogNotFound,
    warnings.wikiSyncNotFound,
  ]);

  return (
    <CurrentPlayerProvider rank={currentRank} playerName={formData.playerName}>
      <FormProvider {...form}>
        <RankCalculator
          submitRankCalculatorAction={submitRankCalculator}
          navigation={
            <Navigation
              actions={
                <RankCalculatorNavigationActions
                  isActionActive={isExecuting || isTransitioning}
                />
              }
              shouldRenderBackButton
            />
          }
        />
      </FormProvider>
    </CurrentPlayerProvider>
  );
}
