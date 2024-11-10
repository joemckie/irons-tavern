import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Card, Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { RankStructure } from '@/app/schemas/rank-calculator';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { useRankCalculator } from '../../hooks/point-calculator/use-rank-calculator';
import { getRankName } from '../../utils/get-rank-name';
import { getPointsRemainingLabel } from '../../utils/get-points-remaining-label';
import { formatNumber } from '../../utils/format-number';

export function RankProgressCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    nextRank,
    rank,
  } = useRankCalculator();
  const { register, setValue, getValues } = useFormContext();
  const rankName = getRankName(rank);
  const nextRankName = nextRank ? getRankName(nextRank) : 'Max rank';

  useEffect(() => {
    if (rankName !== getValues('rank')) {
      setValue('rank', rankName, {
        shouldDirty: true,
      });
    }
  }, [rankName, setValue, getValues]);

  useEffect(() => {
    setValue('points', pointsAwarded, {
      shouldDirty: true,
    });
  }, [pointsAwarded, setValue]);

  return (
    <Box>
      <input
        {...register('rank', { value: rankName })}
        defaultValue={rankName}
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
                src={`/icons/${rank.replaceAll(' ', '_').toLowerCase()}.png`}
                width={22}
                height={22}
              />
            </Flex>
            <Flex gap="2" align="center">
              {nextRank && (
                <Image
                  alt={`${nextRank} icon`}
                  src={`/icons/${nextRank.replaceAll(' ', '_').toLowerCase()}.png`}
                  height={22}
                  width={22}
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
        </Flex>
      </Card>
    </Box>
  );
}
