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
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { publishRankSubmissionAction } from '../[player]/actions/publish-rank-submission-action';
import { useRankCalculator } from '../hooks/point-calculator/use-rank-calculator';
import { DeleteSubmissionDataDialog } from './delete-submission-data-dialog';
import { handleToastUpdates } from '../utils/handle-toast-updates';
import { useCurrentPlayer } from '../contexts/current-player-context';

interface RankCalculatorNavigationActionsProps {
  isActionActive: boolean;
}

export function RankCalculatorNavigationActions({
  isActionActive,
}: RankCalculatorNavigationActionsProps) {
  const { reset } = useFormContext<RankCalculatorSchema>();
  const { isValid, isDirty, isSubmitting } =
    useFormState<RankCalculatorSchema>();
  const [, startResetTransition] = useTransition();
  const [, startDeleteDialogTransition] = useTransition();
  const { pointsAwarded: totalPoints, rank } = useRankCalculator();
  const { playerName, rank: currentRank } = useCurrentPlayer();
  const [
    isDeleteSubmissionDataDialogOpen,
    setIsDeleteSubmissionDataDialogOpen,
  ] = useState(false);
  const { executeAsync: publishRankSubmission } = useAction(
    publishRankSubmissionAction.bind(null, currentRank, playerName),
  );

  return (
    <Flex gap="1">
      <Button asChild variant="soft" color="gray" type="button">
        <Link
          href="https://discord.com/channels/697956179854229552/1361027528701120664/1361029669968936960"
          target="_blank"
        >
          Help
        </Link>
      </Button>
      <Flex>
        <Button
          role="button"
          loading={isSubmitting || isActionActive}
          disabled={!isDirty || !isValid || isSubmitting || isActionActive}
          variant="soft"
          type="submit"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        >
          Save
        </Button>
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger disabled={isSubmitting || isActionActive}>
            <IconButton
              className="save-dropdown-button"
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
                if (isDirty) {
                  toast.error('Please save your data first!');

                  return;
                }

                void handleToastUpdates(
                  publishRankSubmission({
                    totalPoints,
                    rank,
                  }),
                  { success: 'Rank application submitted!' },
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
    </Flex>
  );
}
