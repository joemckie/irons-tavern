'use client';

import { useState } from 'react';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '../components/input';

interface FormData {
  player: string;
}

export default function RankCalculatorPlayerList() {
  const router = useRouter();
  const methods = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = () => {
    setIsLoading(true);

    try {
      router.push(
        `/rank-calculator/${encodeURIComponent(methods.getValues('player'))}`,
      );
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Flex
          height="100vh"
          align="center"
          justify="center"
          gap="6"
          direction="column"
        >
          <Heading>Irons Tavern Rank Calculator</Heading>
          <Flex direction="column" gap="4" width="330px">
            <Input
              {...methods.register('player')}
              size="3"
              placeholder="Player name"
              required
            />
            <Button loading={isLoading} size="3">
              Go to calculator
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
