'use client';

import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { Input } from '../../components/input';
import {
  savePlayerAccount,
  validatePlayerName,
} from '../../actions/player-accounts';

interface FormData {
  playerName: string;
}

export default function RankCalculatorPlayerList() {
  const router = useRouter();
  const methods = useForm<FormData>({
    mode: 'onSubmit',
    criteriaMode: 'all',
  });
  const { isDirty, isSubmitting, errors } = methods.formState;

  const onSubmit: SubmitHandler<FormData> = async ({ playerName }) => {
    try {
      const response = await savePlayerAccount(playerName);

      if (response === 'OK') {
        router.push('/rank-calculator/players');
      }
    } catch (error) {
      console.log(error);
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
          <Heading size="5">New rank application</Heading>
          <Flex direction="column" gap="4" width="330px">
            <Input
              {...methods.register('playerName', {
                required: 'Player name is required',
                validate: {
                  playerExists: async (playerName) => {
                    const valid = await validatePlayerName(playerName);

                    return valid || 'Invalid player name';
                  },
                },
              })}
              hasError={!!errors.playerName}
              size="3"
              placeholder="Player name"
              required
            />
            <ErrorMessage
              errors={errors}
              name="playerName"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
            <Button
              disabled={!isDirty || isSubmitting}
              loading={methods.formState.isSubmitting}
              size="3"
            >
              Go to rank calculator
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
