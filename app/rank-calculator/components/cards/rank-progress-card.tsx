import { Box, Card, Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { RankStructure } from '@/types/rank-calculator';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';
import { useRankCalculator } from '../../hooks/point-calculator/use-rank-calculator';
import { getRankName } from '../../utils/get-rank-name';

export function RankProgressCard() {
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    nextRank,
    rank,
  } = useRankCalculator();
  const rankName = getRankName(rank);
  const nextRankName = nextRank ? getRankName(nextRank) : 'Max rank';

  return (
    <Box>
      <Card>
        <Flex direction="column" gap="3">
          <DataCard.Row
            left={
              <Text aria-label="Total points" color="gray" size="2">
                {pointsAwarded}
              </Text>
            }
            center={
              <Text size="2" role="heading" weight="bold">
                Rank
              </Text>
            }
            right={
              <Text aria-label="Points to next rank" color="gray" size="2">
                ({pointsRemaining})
              </Text>
            }
          />
          <Progress size="3" value={pointsAwardedPercentage} />
          <Flex justify="between">
            <Flex gap="2">
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
            <Flex gap="2">
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
                options={Object.values(RankStructure)}
              />
            }
          />
        </Flex>
      </Card>
    </Box>
  );
}
