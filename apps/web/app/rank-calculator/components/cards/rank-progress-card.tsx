import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Button,
  Card,
  Dialog,
  Flex,
  Progress,
  Separator,
  Text,
} from '@radix-ui/themes';
import { RankStructure } from '@/app/schemas/rank-calculator';
import { useAction } from 'next-safe-action/hooks';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { useRankCalculator } from '../../hooks/point-calculator/use-rank-calculator';
import { getRankName } from '../../utils/get-rank-name';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';
import { RankStructureInfoModal } from '../rank-structure-info-modal';
import { getRankImageUrl } from '../../utils/get-rank-image-url';
import { useCurrentPlayer } from '../../contexts/current-player-context';
import { handleToastUpdates } from '../../utils/handle-toast-updates';
import { publishRankSubmissionAction } from '../../[player]/actions/publish-rank-submission-action';

export function RankProgressCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    nextRank,
    rank,
  } = useRankCalculator();
  const { register, setValue, getValues } = useFormContext();
  const { playerName, rank: currentRank } = useCurrentPlayer();
  const [showRankUpDialog, setShowRankUpDialog] = useState(
    currentRank && currentRank !== rank,
  );
  const rankName = getRankName(rank);
  const nextRankName = nextRank ? getRankName(nextRank) : 'Max rank';
  const { executeAsync: publishRankSubmission } = useAction(
    publishRankSubmissionAction.bind(null, currentRank, playerName),
  );

  useEffect(() => {
    if (rank !== getValues('rank')) {
      setValue('rank', rank, {
        shouldDirty: true,
      });
    }
  }, [rank, setValue, getValues]);

  useEffect(() => {
    setValue('points', pointsAwarded, {
      shouldDirty: true,
    });
  }, [pointsAwarded, setValue]);

  return (
    <>
      <input
        {...register('rank', { value: rank })}
        defaultValue={rank}
        type="hidden"
      />
      <input
        {...register('points', { value: pointsAwarded })}
        defaultValue={pointsAwarded}
        type="hidden"
      />
      <Card>
        <Flex direction="column" gap="3">
          <DataCard.Row
            left={
              <Flex direction="column">
                <Text size="2" color="gray" id="total-points-label">
                  Total points
                </Text>
                <Text
                  aria-labelledby="total-points-label"
                  size="3"
                  weight="medium"
                >
                  {formatNumber(pointsAwarded)}
                </Text>
              </Flex>
            }
            right={
              <Flex direction="column" align="end">
                <Text size="2" color="gray" id="points-to-next-rank-label">
                  Points to next rank
                </Text>
                <Text
                  aria-labelledby="points-to-next-rank-label"
                  size="3"
                  weight="medium"
                >
                  {getPointsRemainingLabel(pointsRemaining)}
                </Text>
              </Flex>
            }
          />
          <Progress size="3" value={pointsAwardedPercentage * 100} />
          <Flex justify="between">
            <Flex gap="2" align="center">
              <Text aria-label="Current rank" color="gray" size="2">
                {rankName}
              </Text>
              <Image
                alt={`${rank} icon`}
                src={getRankImageUrl(rank)}
                width={22}
                height={22}
                unoptimized
              />
            </Flex>
            <Flex gap="2" align="center">
              {nextRank && (
                <Image
                  alt={`${nextRank} icon`}
                  src={getRankImageUrl(nextRank)}
                  height={22}
                  width={22}
                  unoptimized
                />
              )}
              <Text aria-label="Next rank" color="gray" size="2">
                {nextRankName}
              </Text>
            </Flex>
          </Flex>
          <Separator size="4" />
          <DataCard.Row
            left={
              <Text color="gray" size="2">
                Rank structure
              </Text>
            }
            right={
              <Select
                aria-label="Selected rank structure"
                name="rankStructure"
                options={RankStructure.options}
              />
            }
          />
          <RankStructureInfoModal />
        </Flex>
      </Card>
      <Dialog.Root
        open={showRankUpDialog}
        onOpenChange={() => {
          setShowRankUpDialog(false);
        }}
      >
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Rank up</Dialog.Title>
          <Dialog.Description size="2" mb="2">
            Congratulations, you have achieved the <strong>{rankName}</strong>{' '}
            rank!
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close
              onClick={() => {
                void handleToastUpdates(
                  publishRankSubmission({
                    totalPoints: pointsAwarded,
                    rank,
                  }),
                  { success: 'Rank application submitted!' },
                );
              }}
            >
              <Button color="green" variant="soft">
                Apply for promotion
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
