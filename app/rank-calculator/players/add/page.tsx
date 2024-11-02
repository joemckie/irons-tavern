'use client';

import { Box, Button, Flex, Heading, Spinner, Text } from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { debounce } from 'lodash';
import * as Sentry from '@sentry/nextjs';
import { CalendarIcon, PersonIcon } from '@radix-ui/react-icons';
import { Input } from '../../components/input';
import {
  assertUniquePlayerRecord,
  fetchPlayerJoinDate,
  savePlayerAccount,
  validatePlayerName,
} from '../../actions/player-accounts';
import { Label } from '../../components/label';
import { DatePicker } from '../../components/date-picker';

interface FormData {
  playerName: string;
  joinDate: Date;
}

const validatePlayerExists = debounce(async (playerName: string) => {
  const valid = await validatePlayerName(playerName);

  return valid || 'Invalid player name';
}, 600);

const validatePlayerUniqueness = debounce(async (playerName: string) => {
  const valid = await assertUniquePlayerRecord(playerName);

  return valid || 'Accounts cannot be duplicated';
}, 600);

export default function RankCalculatorPlayerList() {
  const router = useRouter();
  const methods = useForm<FormData>({
    mode: 'onSubmit',
    criteriaMode: 'all',
  });
  const { isDirty, isSubmitting, errors, validatingFields } = methods.formState;

  const onSubmit: SubmitHandler<FormData> = async ({
    playerName,
    joinDate,
  }) => {
    try {
      const response = await savePlayerAccount(playerName, joinDate);

      if (response === 'OK') {
        router.push(`/rank-calculator/${playerName}`);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const fetchAndSetJoinDate = debounce(async () => {
    const playerNameValue = methods.getValues('playerName');
    const joinDate = await fetchPlayerJoinDate(playerNameValue);

    if (joinDate) {
      methods.setValue('joinDate', joinDate);
    }
  }, 600);

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
          <Flex direction="column" gap="3" width="330px">
            <Flex direction="column" gap="2">
              <Label weight="bold">
                <Text as="p" mb="2">
                  Player name
                </Text>
                <Input
                  {...methods.register('playerName', {
                    onChange: fetchAndSetJoinDate,
                    required: 'Player name is required',
                    maxLength: 12,
                    validate: {
                      playerExists: validatePlayerExists,
                      isUnique: validatePlayerUniqueness,
                    },
                  })}
                  maxLength={12}
                  hasError={!!errors.playerName}
                  size="3"
                  placeholder="Enter your RSN"
                  required
                  id="playerName"
                  leftIcon={<PersonIcon />}
                  rightIcon={
                    validatingFields.playerName ? <Spinner /> : undefined
                  }
                />
              </Label>
              <ErrorMessage
                errors={errors}
                name="playerName"
                render={({ message }) => (
                  <Text as="p" color="red">
                    {message}
                  </Text>
                )}
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Label weight="bold">
                <Text as="p" mb="2">
                  Join date
                </Text>
                <Box asChild width="100%">
                  <DatePicker
                    isClearable
                    name="joinDate"
                    placeholderText="dd-mm-yyyy"
                    required
                    size="3"
                    customInput={
                      <Input
                        size="3"
                        hasError={!!errors.joinDate}
                        leftIcon={<CalendarIcon />}
                        rightIcon={
                          validatingFields.joinDate ? <Spinner /> : undefined
                        }
                      />
                    }
                  />
                </Box>
              </Label>
              <ErrorMessage
                errors={errors}
                name="joinDate"
                render={({ message }) => (
                  <Text as="p" color="red">
                    {message}
                  </Text>
                )}
              />
            </Flex>
            <Flex gap="2" mt="2">
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
                    Next
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
