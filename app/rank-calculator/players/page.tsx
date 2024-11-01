import { Button, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';

export default function RankCalculatorPlayerList() {
  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      gap="6"
      direction="column"
    >
      <Heading>Irons Tavern Rank Calculator</Heading>
      <Flex direction="column" gap="4" width="330px">
        <Button asChild size="3">
          <Link href="/rank-calculator/players/add">Add player</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
