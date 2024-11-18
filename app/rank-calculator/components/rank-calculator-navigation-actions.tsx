'use client';

import {
  Button,
  ChevronDownIcon,
  DropdownMenu,
  Flex,
  IconButton,
} from '@radix-ui/themes';
import { useState, useTransition } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { Rank } from '@/config/enums';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'react-toastify';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { publishRankSubmissionAction } from '../[player]/actions/publish-rank-submission-action';
import { useRankCalculator } from '../hooks/point-calculator/use-rank-calculator';
import { DeleteSubmissionDataDialog } from './delete-submission-data-dialog';

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
  const [isResetTransitioning, startResetTransition] = useTransition();
  const [, startDeleteDialogTransition] = useTransition();
  const { pointsAwarded: totalPoints, rank } = useRankCalculator();
  const [
    isDeleteSubmissionDataDialogOpen,
    setIsDeleteSubmissionDataDialogOpen,
  ] = useState(false);
  const { execute: publishRankSubmission } = useAction(
    publishRankSubmissionAction.bind(null, currentRank, playerName),
    {
      onSuccess() {
        toast.success('Rank application submitted!');
      },
      onError({ error: { serverError } }) {
        if (serverError) {
          toast.error(serverError);
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
          startResetTransition(() => {
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
          <DropdownMenu.Content color="gray" variant="soft">
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
            <DropdownMenu.Item
              color="red"
              onSelect={() => {
                startDeleteDialogTransition(() => {
                  setIsDeleteSubmissionDataDialogOpen(true);
                });
              }}
            >
              Reset submission data
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DeleteSubmissionDataDialog
          open={isDeleteSubmissionDataDialogOpen}
          onOpenChange={setIsDeleteSubmissionDataDialogOpen}
        />
      </Flex>
    </>
  );
}
