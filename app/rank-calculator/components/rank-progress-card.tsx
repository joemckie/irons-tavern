import { Box, Card, Flex, Progress, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { DataCard } from './data-card';

export function RankProgressCard() {
  return (
    <Box>
      <Card>
        <Flex direction="column" gap="3">
          <DataCard.Row
            left={
              <Text color="gray" size="2">
                175000
              </Text>
            }
            center={<Text weight="bold">Rank</Text>}
            right={
              <Text color="gray" size="2">
                (25000)
              </Text>
            }
          />
          <Progress size="3" value={75} />
          <Flex justify="between">
            <Flex gap="2">
              <Text color="gray" size="2">
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
              <Text color="gray" size="2">
                Dragonstone
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
