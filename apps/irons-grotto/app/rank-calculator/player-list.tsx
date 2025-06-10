'use client';

import { Player } from '@/app/schemas/player';
import { useOptimisticAction } from 'next-safe-action/hooks';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import { format } from 'date-fns';
import { ChevronRightIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { deletePlayerAccountAction } from './actions/delete-player-account-action';
import { DeleteSubmissionButton } from './components/delete-submission-button';

interface PlayerListProps {
  accounts: Record<string, Player>;
}

export function PlayerList({ accounts }: PlayerListProps) {
  const { execute, optimisticState } = useOptimisticAction(
    deletePlayerAccountAction,
    {
      currentState: accounts,
      updateFn(state, id) {
        const { [id]: _removedAccount, ...newAccounts } = state;

        return newAccounts;
      },
      onError({ error: { serverError } }) {
        if (serverError) {
          toast.error(serverError);
        }
      },
    },
  );

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      gap="6"
      direction="column"
    >
      <Heading size="5">Irons Tavern Rank Calculator</Heading>
      <Flex direction="column" gap="4" width="330px">
        {Object.values(optimisticState).map(
          ({ rsn, joinDate, isNameInvalid }) => (
            <Card key={rsn}>
              <Flex align="center" justify="between">
                <Box>
                  <Text as="p" weight="bold">
                    {rsn}
                  </Text>
                  <Text as="p" size="2" color="gray">
                    Joined {format(joinDate, 'dd MMM yyyy')}
                  </Text>
                </Box>
                <Flex gap="2">
                  <DeleteSubmissionButton
                    deletePlayerAccountAction={execute}
                    playerName={rsn}
                  />
                  <Tooltip content="Edit">
                    <IconButton asChild variant="soft" color="gray">
                      <Link
                        href={`/rank-calculator/players/edit/${rsn.toLowerCase()}`}
                      >
                        <Pencil1Icon />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Go to calculator">
                    <IconButton asChild disabled={isNameInvalid}>
                      <Link
                        href={`/rank-calculator/${rsn.toLowerCase()}`}
                        style={{
                          ...(isNameInvalid
                            ? {
                                pointerEvents: 'none',
                              }
                            : {}),
                        }}
                      >
                        <ChevronRightIcon />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </Flex>
              </Flex>
            </Card>
          ),
        )}
        <Button asChild size="3">
          <Link href="/rank-calculator/players/add">Add new player</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
