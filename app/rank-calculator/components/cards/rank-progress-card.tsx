import { Box, Card, Flex, Progress, Separator, Text } from '@radix-ui/themes';
import { RankStructure } from '@/types/rank-calculator';
import Image from 'next/image';
import { DataCard } from '../data-card';
import { Select } from '../select';

export function RankProgressCard() {
  return (
    <Box>
      <Card>
        <Flex direction="column" gap="3">
          <DataCard.Row
            left={
              <Text aria-label="Total points" color="gray" size="2">
                175000
              </Text>
            }
            center={<Text weight="bold">Rank</Text>}
            right={
              <Text aria-label="Points to next rank" color="gray" size="2">
                (25000)
              </Text>
            }
          />
          <Progress size="3" value={75} />
          <Flex justify="between">
            <Flex gap="2">
              <Text aria-label="Current rank" color="gray" size="2">
                Warlock
              </Text>
              <Image
                alt="Warlock icon"
                src="/icons/warlock.png"
                width={22}
                height={22}
              />
            </Flex>
            <Flex gap="2">
              <Image
                alt="Draconic icon"
                src="/icons/dragonstone.png"
                height={22}
                width={22}
              />
              <Text aria-label="Next rank" color="gray" size="2">
                Dragonstone
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
