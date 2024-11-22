'use client';

import { ForwardRefExoticComponent, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import { Flex, IconProps, Text, TextProps } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { RankCalculator } from '../../[player]/rank-calculator';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { ViewSubmissionNavigationActions } from './components/view-submission-navigation-actions';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { Navigation } from '../../components/navigation';

interface FormWrapperProps {
  formData: Omit<RankCalculatorSchema, 'rank' | 'points'>;
  initialSubmissionStatus: RankSubmissionStatus;
  userPermissions: string | undefined;
  diffErrors: FieldErrors;
}

export function ReadonlyFormWrapper({
  formData,
  initialSubmissionStatus,
  userPermissions,
  diffErrors,
}: FormWrapperProps) {
  const [submissionStatus, setSubmissionStatus] = useState(
    initialSubmissionStatus,
  );

  const isModeratorActionsAvailable =
    userCanModerateSubmission(userPermissions) &&
    submissionStatus === 'Pending';

  const methods = useForm<Omit<RankCalculatorSchema, 'rank' | 'points'>>({
    disabled: true,
    values: formData,
    errors: diffErrors,
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

  console.log(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <RankCalculator
        navigation={
          <Navigation
            actions={renderNavigationActions()}
            shouldRenderBackButton={false}
          />
        }
        submitRankCalculatorAction={() => {}}
      />
    </FormProvider>
  );
}
