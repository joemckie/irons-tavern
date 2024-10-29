'use client';

import { SyntheticEvent, useRef } from 'react';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { Input } from './components/input';

export default function RankCalculatorHome() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleClick(e: SyntheticEvent) {
    e.preventDefault();

    const player = inputRef.current?.value ?? '';

    router.push(`/rank-calculator/${encodeURIComponent(player)}`);
  }

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
        <Input ref={inputRef} size="3" placeholder="Player name" />
        <Button onClick={(e) => handleClick(e)} size="3">
          Go to calculator
        </Button>
      </Flex>
    </Flex>
  );
}
