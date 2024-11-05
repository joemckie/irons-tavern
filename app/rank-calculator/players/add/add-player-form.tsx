'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  ScrollArea,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { debounce } from 'lodash';
import { CalendarIcon, PersonIcon } from '@radix-ui/react-icons';
import * as Ariakit from '@ariakit/react';
import { startTransition, useMemo } from 'react';
import { search } from 'fast-fuzzy';
import { toast } from 'react-toastify';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { Input } from '../../components/input';
import {
  assertUniquePlayerRecord,
  fetchPlayerJoinDate,
  validatePlayerName,
} from '../../actions/player-accounts';
import { Label } from '../../components/label';
import { DatePicker } from '../../components/date-picker';

export interface FormData {
  playerName: string;
  joinDate: Date;
}

interface AddPlayerFormProps {
  members: string[];
  submitFormAction: SubmitHandler<FormData>;
}

const validatePlayerExists = debounce(async (playerName: string) => {
  const valid = await validatePlayerName(playerName);

  return valid || 'Invalid player name';
}, 600);

const validatePlayerUniqueness = debounce(async (playerName: string) => {
  const valid = await assertUniquePlayerRecord(playerName);

  return valid || 'Accounts cannot be duplicated';
}, 600);

export function AddPlayerForm({
  members,
  submitFormAction,
}: AddPlayerFormProps) {
  const router = useRouter();
  const methods = useForm<FormData>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    defaultValues: {
      playerName: '',
    },
  });
  const { isDirty, isSubmitting, errors, validatingFields } = methods.formState;
  const playerNameValue = methods.watch('playerName');

  const fetchAndSetJoinDate = debounce(async () => {
    const playerName = methods.getValues('playerName');
    const joinDate = await fetchPlayerJoinDate(playerName);

    if (joinDate) {
      methods.setValue('joinDate', joinDate);
    }
  }, 600);

  const matches = useMemo(
    () => (playerNameValue ? search(playerNameValue, members) : members),
    [playerNameValue, members],
  );

  async function handleSubmit(data: FormData) {
    try {
      await submitFormAction(data);
    } catch (error) {
      if (isRedirectError(error)) {
        toast.success('Player saved!');

        return;
      }

      toast.error('Failed to save player');
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
              <Ariakit.ComboboxProvider
                setValue={(value) => {
                  startTransition(() => {
                    methods.setValue('playerName', value);
                  });
                }}
              >
                <Label weight="bold">
                  <Text as="p" mb="2">
                    Player name
                  </Text>
                  <Ariakit.Combobox
                    showOnClick
                    autoComplete="both"
                    render={({ color, defaultValue, ...props }) => (
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
                        {...props}
                      />
                    )}
                  />
                  <Ariakit.ComboboxPopover
                    getAnchorRect={(anchor) =>
                      anchor?.parentElement?.getBoundingClientRect() ?? null
                    }
                    portal
                    portalElement={
                      typeof document !== 'undefined'
                        ? document.getElementById('theme-root')
                        : null
                    }
                    gutter={8}
                    sameWidth
                    className="rt-PopoverContent rt-SelectContent rt-r-size-1 popover"
                    render={({ dir, children, ...props }) => (
                      <ScrollArea {...props}>
                        <Box>{children}</Box>
                      </ScrollArea>
                    )}
                  >
                    {matches.length === 0 && playerNameValue && (
                      <Box p="2">
                        <Text size="2">No matches found</Text>
                      </Box>
                    )}
                    {matches.map((value) => (
                      <Ariakit.ComboboxItem
                        key={value}
                        value={value}
                        className="combobox-item"
                        render={({ color, ...props }) => (
                          <Text {...props} size="2" />
                        )}
                      />
                    ))}
                  </Ariakit.ComboboxPopover>
                </Label>
              </Ariakit.ComboboxProvider>
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
                    type="button"
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
