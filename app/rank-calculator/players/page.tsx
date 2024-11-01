import {
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@radix-ui/themes';
import Link from 'next/link';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { fetchPlayerAccounts } from '../actions/player-accounts';
import { DeleteSubmissionButton } from './delete-submission-button';

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
        {Object.keys(accounts).map((playerName) => (
          <Card key={playerName}>
            <Flex align="center" justify="between">
              <Text weight="bold">{playerName}</Text>
              <Flex gap="2">
                <DeleteSubmissionButton playerName={playerName} />
                <IconButton asChild>
                  <Link href={`/rank-calculator/${playerName}`}>
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
