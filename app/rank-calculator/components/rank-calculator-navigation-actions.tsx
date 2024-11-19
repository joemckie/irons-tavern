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
import Link from 'next/link';
import { DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';
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
  const { isValid, isDirty, isSubmitting } =
    useFormState<RankCalculatorSchema>();
  const [, startResetTransition] = useTransition();
  const [, startDeleteDialogTransition] = useTransition();
  const { pointsAwarded: totalPoints, rank } = useRankCalculator();
  const [
    isDeleteSubmissionDataDialogOpen,
    setIsDeleteSubmissionDataDialogOpen,
  ] = useState(false);
  const { executeAsync: publishRankSubmission } = useAction(
    publishRankSubmissionAction.bind(null, currentRank, playerName),
  );

  return (
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
        <DropdownMenu.Trigger disabled={isSubmitting}>
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
              toast.promise(
                publishRankSubmission({
                  totalPoints,
                  rank,
                }),
                {
                  pending: 'Applying for rank...',
                  error: {
                    render({ data }) {
                      if (data instanceof Error) {
                        return data.message;
                      }

                      return DEFAULT_SERVER_ERROR_MESSAGE;
                    },
                  },
                  success: 'Rank application submitted!',
                },
              );
            }}
          >
            Apply for promotion
          </DropdownMenu.Item>
          <DropdownMenu.Item
            disabled={!isDirty}
            onClick={() => {
              startResetTransition(() => {
                reset();
              });
            }}
          >
            Reset form defaults
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href={`/rank-calculator/players/edit/${playerName.toLowerCase()}`}
            >
              Edit player
            </Link>
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
            Delete data
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <DeleteSubmissionDataDialog
        open={isDeleteSubmissionDataDialogOpen}
        onOpenChange={setIsDeleteSubmissionDataDialogOpen}
      />
    </Flex>
  );
}
