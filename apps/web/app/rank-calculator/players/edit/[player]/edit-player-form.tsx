'use client';

import {
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { CalendarIcon, CircleBackslashIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { useAction } from 'next-safe-action/hooks';
import { Player } from '@/app/schemas/player';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { DatePicker } from '../../../components/date-picker';
import { PlayerNameInput } from './components/player-name-input';
import { editPlayerAction } from './actions/edit-player-action';
import { fetchPlayerJoinDateAction } from '../../actions/fetch-player-join-date-action';
import { EditPlayerSchema } from './actions/edit-player-schema';
import { Checkbox } from '../../../components/checkbox';

interface EditPlayerFormProps {
  members: string[];
  playerRecord: Player;
}

export function EditPlayerForm({ members, playerRecord }: EditPlayerFormProps) {
  const router = useRouter();
  const boundEditPlayerAction = editPlayerAction.bind(
    null,
    playerRecord.rsn,
    playerRecord.rank,
  );
  const { form, handleSubmitWithAction } = useHookFormAction(
    boundEditPlayerAction,
    zodResolver(EditPlayerSchema),
    {
      actionProps: {
        onError({ error }) {
          if (error.serverError) {
            toast.error('Failed to edit player!');
          }
        },
        onSuccess() {
          toast.success(`Player edited successfully!`);

          router.push(`/rank-calculator`);
        },
      },
      formProps: {
        mode: 'onSubmit',
        criteriaMode: 'all',
        defaultValues: {
          joinDate: new Date(playerRecord.joinDate),
          playerName: playerRecord.rsn,
          isMobileOnly: playerRecord.isMobileOnly,
        },
      },
    },
  );
  const { isDirty, errors, isSubmitting } = form.formState;

  const {
    execute: executeFetchPlayerJoinDate,
    isExecuting: isFetchPlayerJoinDateExecuting,
  } = useAction(fetchPlayerJoinDateAction, {
    onSettled({ result }) {
      if (result.data) {
        form.setValue('joinDate', result.data, {
          shouldDirty: true,
        });
      }
    },
  });

  const debouncedExecuteFetchPlayerJoinDate = debounce(
    executeFetchPlayerJoinDate,
    600,
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmitWithAction}>
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
          {playerRecord.isNameInvalid && (
            <Callout.Root variant="soft" color="red">
              <Callout.Icon>
                <CircleBackslashIcon />
              </Callout.Icon>
              <Callout.Text>
                Your player name has become invalid (this is usually due to a
                name change).
              </Callout.Text>
              <Callout.Text>
                Please update it to regain access to the calculator.
              </Callout.Text>
            </Callout.Root>
          )}
          <Heading size="5">Editing {playerRecord.rsn}</Heading>
          <Flex direction="column" gap="3" width="330px">
            <Flex direction="column" gap="2">
              <PlayerNameInput
                members={members}
                onChange={debouncedExecuteFetchPlayerJoinDate}
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Label weight="bold">
                <Text as="p" mb="2">
                  Join date
                </Text>
                <Box asChild width="100%">
                  <DatePicker
                    disabled={isFetchPlayerJoinDateExecuting}
                    name="joinDate"
                    required
                    placeholderText="dd/mm/yyyy"
                    size="3"
                    customInput={
                      <Input
                        size="3"
                        hasError={!!errors.joinDate}
                        leftIcon={<CalendarIcon />}
                        rightIcon={
                          isFetchPlayerJoinDateExecuting ? (
                            <Spinner />
                          ) : undefined
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
            <Flex direction="row" gap="2" align="center" asChild>
              <Label weight="bold">
                <Checkbox
                  checked={form.watch('isMobileOnly')}
                  name="isMobileOnly"
                />
                <Text as="span">Mobile only player</Text>
              </Label>
            </Flex>
            <Flex gap="2" mt="2">
              <Flex flexGrow="1">
                <Box asChild width="100%">
                  <Button
                    type="button"
                    color="gray"
                    size="3"
                    onClick={() => {
                      router.push('/rank-calculator');
                    }}
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
                    loading={isSubmitting}
                    size="3"
                  >
                    Save
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
