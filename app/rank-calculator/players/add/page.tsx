'use client';

import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { Input } from '../../components/input';
import {
  savePlayerAccount,
  validatePlayerName,
} from '../../actions/player-accounts';
import { Label } from '../../components/label';

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
          width="450px"
          my="0"
          mx="auto"
        >
          <Heading size="5">New rank application</Heading>
          <Text as="p" color="gray" align="center">
            Enter your player name below.
            <br />
            We will attempt to populate as much data as possible,
            <br />
            but please double check to make sure everything is correct!
          </Text>
          <Flex direction="column" gap="3" width="330px">
            <Flex direction="column" gap="2" asChild>
              <Label weight="bold">
                <Text>Player name</Text>
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
                  placeholder="Enter your RSN"
                  required
                  id="playerName"
                />
              </Label>
            </Flex>
            <ErrorMessage
              errors={errors}
              name="playerName"
              render={({ message }) => (
                <Text as="p" color="red" mt="2">
                  {message}
                </Text>
              )}
            />
            <Flex gap="2">
              <Flex flexGrow="1">
                <Box asChild width="100%">
                  <Button
                    color="gray"
                    size="3"
                    onClick={router.back}
                    variant="soft"
                  >
                    Back
                  </Button>
                </Box>
              </Flex>
              <Flex flexGrow="1">
                <Box asChild width="100%">
                  <Button
                    disabled={!isDirty || isSubmitting}
                    loading={methods.formState.isSubmitting}
                    size="3"
                  >
                    Create
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
}
