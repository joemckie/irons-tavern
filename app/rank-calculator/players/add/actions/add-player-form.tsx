'use client';

import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import { FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { CalendarIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { DatePicker } from '../../../components/date-picker';
import { PlayerNameInput } from '../components/player-name-input';
import { addPlayerSchema } from './add-player-validation';
import { addPlayerAction } from './add-player-action';

interface AddPlayerFormProps {
  members: string[];
}

export function AddPlayerForm({ members }: AddPlayerFormProps) {
  const router = useRouter();
  const {
    action: { isExecuting, execute },
    form,
  } = useHookFormAction(addPlayerAction, zodResolver(addPlayerSchema), {
    actionProps: {
      onError({ error }) {
        if (error.serverError) {
          toast.error('Failed to save player!');
        }
      },
      async onSuccess({ data }) {
        if (data?.playerName) {
          toast.success(`Player saved successfully!`);

          router.push(`/rank-calculator/${data.playerName.toLowerCase()}`);
        }
      },
    },
    formProps: {
      mode: 'onSubmit',
      criteriaMode: 'all',
    },
  });
  const { isDirty, errors } = form.formState;

  return (
    <FormProvider {...form}>
      <form action={execute}>
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
              <PlayerNameInput members={members} />
            </Flex>
            <Flex direction="column" gap="2">
              <Label weight="bold">
                <Text as="p" mb="2">
                  Join date
                </Text>
                <Box asChild width="100%">
                  <DatePicker
                    name="joinDate"
                    required
                    isClearable
                    placeholderText="dd-mm-yyyy"
                    size="3"
                    customInput={
                      <Input
                        size="3"
                        hasError={!!errors.joinDate}
                        leftIcon={<CalendarIcon />}
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
                    disabled={!isDirty || isExecuting}
                    loading={isExecuting}
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
