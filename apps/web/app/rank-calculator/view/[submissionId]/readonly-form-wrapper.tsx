'use client';

import { ForwardRefExoticComponent, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import {
  RankSubmissionMetadata,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { Flex, IconProps, Text, TextProps } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { RankCalculator } from '../../[player]/rank-calculator';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { ViewSubmissionNavigationActions } from './components/view-submission-navigation-actions';
import { Navigation } from '../../components/navigation';
import { ModerationProvider } from '../../contexts/moderation-context';
import { userRankOutranksSubmissionRankStructure } from './utils/user-outranks-submission-rank-structure';
import type { StaffRank } from '@/config/ranks';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  diffErrors: FieldErrors;
  submissionMetadata: RankSubmissionMetadata;
  actionedByUsername: string | null;
  hasManageRolesPermission: boolean;
  userRank: StaffRank | null;
}

export function ReadonlyFormWrapper({
  formData,
  diffErrors,
  submissionMetadata,
  actionedByUsername,
  hasManageRolesPermission,
  userRank,
}: FormWrapperProps) {
  const [submissionStatus, setSubmissionStatus] = useState(
    submissionMetadata.status,
  );

  const userCanModerateSubmission =
    hasManageRolesPermission &&
    userRank !== null &&
    userRankOutranksSubmissionRankStructure(userRank, formData.rankStructure);

  const isModeratorActionsAvailable =
    userCanModerateSubmission && submissionStatus === 'Pending';

  const methods = useForm<Omit<RankCalculatorSchema, 'rank' | 'points'>>({
    disabled: true,
    defaultValues: formData,
    errors: userCanModerateSubmission ? diffErrors : {},
  });

  function renderNavigationActions() {
    const textColourMap = {
      Approved: 'green',
      Pending: undefined,
      Rejected: 'red',
    } satisfies Record<RankSubmissionStatus, TextProps['color']>;

    const iconMap = {
      Approved: CheckIcon,
      Pending: undefined,
      Rejected: Cross2Icon,
    } satisfies Record<
      RankSubmissionStatus,
      ForwardRefExoticComponent<IconProps> | undefined
    >;

    if (isModeratorActionsAvailable) {
      return (
        <ViewSubmissionNavigationActions
          onStatusChange={setSubmissionStatus}
          playerName={formData.playerName}
        />
      );
    }

    const IconComponent = iconMap[submissionStatus];

    return (
      <Text
        weight="medium"
        size="2"
        color={textColourMap[submissionStatus]}
        asChild
      >
        <Flex gap="1" align="center">
          {submissionStatus}
          {IconComponent && <IconComponent height={20} width={20} />}
        </Flex>
      </Text>
    );
  }

  return (
    <FormProvider {...methods}>
      <ModerationProvider
        hasTemplePlayerStats={submissionMetadata.hasTemplePlayerStats}
        hasTempleCollectionLog={submissionMetadata.hasTempleCollectionLog}
        hasWikiSyncData={submissionMetadata.hasWikiSyncData}
        actionedByUsername={actionedByUsername}
        isTempleCollectionLogOutdated={
          submissionMetadata.isTempleCollectionLogOutdated
        }
        userCanModerateSubmission={userCanModerateSubmission}
      >
        <RankCalculator
          navigation={
            <Navigation
              actions={renderNavigationActions()}
              shouldRenderBackButton={false}
            />
          }
          submitRankCalculatorAction={undefined}
        />
      </ModerationProvider>
    </FormProvider>
  );
}
