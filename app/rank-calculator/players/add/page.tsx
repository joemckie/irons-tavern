'use client';

import { Button, Flex, Heading } from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/input';

interface FormData {
  player: string;
}

export default function RankCalculatorPlayerList() {
  const router = useRouter();
  const methods = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    router.push(
      `/rank-calculator/${encodeURIComponent(methods.getValues('player'))}`,
    );
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
            <Button loading={methods.formState.isSubmitting} size="3">
              Save player
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
