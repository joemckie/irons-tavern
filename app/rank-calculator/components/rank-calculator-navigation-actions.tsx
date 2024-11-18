'use client';

import {
  Button,
  ChevronDownIcon,
  DropdownMenu,
  Flex,
  IconButton,
} from '@radix-ui/themes';
import { useTransition } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { Rank } from '@/config/enums';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { publishRankSubmissionAction } from '../[player]/actions/publish-rank-submission-action';
import { useRankCalculator } from '../hooks/point-calculator/use-rank-calculator';

interface RankCalculatorNavigationActionsProps {
  currentRank?: Rank;
  playerName: string;
}

export function RankCalculatorNavigationActions({
  currentRank,
  playerName,
}: RankCalculatorNavigationActionsProps) {
  const { reset } = useFormContext<RankCalculatorSchema>();
  const { isValid, isSubmitting, isDirty } = useFormState();
  const [isResetTransitioning, startTransition] = useTransition();
  const { pointsAwarded: totalPoints, rank } = useRankCalculator();
  const { execute: publishRankSubmission } = useAction(
    publishRankSubmissionAction.bind(null, currentRank, playerName),
    {
      onSuccess() {
        toast.success('Rank application submitted!');
      },
      onError({ error: { serverError } }) {
        if (serverError) {
          toast.error('Failed to submit application!');
        }
      },
    },
  );

  return (
    <>
      <Button
        loading={isResetTransitioning}
        variant="soft"
        color="gray"
        type="button"
        disabled={!isDirty}
        onClick={() => {
          startTransition(() => {
            reset();
          });
        }}
      >
        Reset
      </Button>
      <Flex gap="1px">
        <Button
          role="button"
          loading={isSubmitting}
          disabled={!isDirty || !isValid || isSubmitting}
          variant="soft"
          type="submit"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        >
          Save
        </Button>
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger>
            <IconButton
              variant="soft"
              type="button"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <ChevronDownIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="soft">
            <DropdownMenu.Item
              onClick={() => {
                publishRankSubmission({
                  totalPoints,
                  rank,
                });
              }}
            >
              Apply for rank
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">
              Reset submission data
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </>
  );
}
