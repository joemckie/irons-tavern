import { Box, Card, Flex, Progress, Text } from '@radix-ui/themes';
import Image from 'next/image';

export function RankProgressCard() {
  return (
    <Box>
      <Card>
        <Flex direction="column" gap="3">
          <Flex justify="between" align="end">
            <Text color="gray">175000</Text>
            <Text weight="bold">Total points</Text>
            <Text color="gray">(25000)</Text>
          </Flex>
          <Progress size="2" value={75} />
          <Flex justify="between">
            <Flex gap="2">
              <Text color="gray">Warlock</Text>
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
              <Text color="gray">Dragonstone</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
