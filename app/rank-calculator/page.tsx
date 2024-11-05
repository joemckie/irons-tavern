import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@radix-ui/themes';
import Link from 'next/link';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DeleteSubmissionButton } from './components/delete-submission-button';
import { fetchPlayerAccounts } from './data-sources/player-accounts';

export default async function RankCalculatorPlayerList() {
  const accounts = await fetchPlayerAccounts();

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      gap="6"
      direction="column"
    >
      <Heading size="5">Irons Tavern Rank Calculator</Heading>
      <Flex direction="column" gap="4" width="330px">
        {Object.values(accounts).map(({ rsn, joinDate }) => (
          <Card key={rsn}>
            <Flex align="center" justify="between">
              <Box>
                <Text as="p" weight="bold">
                  {rsn}
                </Text>
                <Text as="p" size="2" color="gray">
                  Joined {format(joinDate, 'dd MMM yyyy')}
                </Text>
              </Box>
              <Flex gap="2">
                <DeleteSubmissionButton playerName={rsn} />
                <IconButton asChild>
                  <Link href={`/rank-calculator/${rsn.toLowerCase()}`}>
                    <ChevronRightIcon />
                  </Link>
                </IconButton>
              </Flex>
            </Flex>
          </Card>
        ))}
        <Button asChild size="3">
          <Link href="/rank-calculator/players/add">Start new application</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
