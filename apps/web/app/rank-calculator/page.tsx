import { Flex, Heading } from '@radix-ui/themes';
import { LogOutButton } from './components/log-out-button';
import { fetchPlayerAccounts } from './data-sources/fetch-player-accounts';
import { PlayerList } from './player-list';
import Image from 'next/image';

export default async function RankCalculatorPlayerList() {
  const accounts = await fetchPlayerAccounts();

  return (
    <>
      <Flex align="center" justify="center" gap="4" direction="column">
        <Flex
          width="100%"
          justify="between"
          align="center"
          p="4"
          style={{
            background: 'var(--color-background)',
            borderBottom: '1px solid var(--gray-5)',
            zIndex: 100,
          }}
        >
          <Flex align="center" gap="2" flexBasis="33.33%">
            <Image
              alt="Irons Tavern logo"
              height={33}
              src="/images/tavern-logo.png"
              width={33}
            />
            <Heading size="3">Irons Tavern</Heading>
          </Flex>
          <Flex flexBasis="33.33%" justify="center">
            <Heading size="3">Rank calculator</Heading>
          </Flex>
          <Flex flexBasis="33.33%" justify="end">
            <LogOutButton />
          </Flex>
        </Flex>
        <PlayerList accounts={accounts} />
      </Flex>
    </>
  );
}
