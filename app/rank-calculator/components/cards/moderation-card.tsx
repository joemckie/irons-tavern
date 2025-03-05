import { Flex, Separator, Text } from '@radix-ui/themes';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { DataCard } from '../data-card';
import { useModeration } from '../../contexts/moderation-context';

export function ModerationCard() {
  const { hasTempleData, hasWikiSyncData, isModerator, actionedByUsername } =
    useModeration();

  if (!isModerator) {
    return null;
  }

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Flex gap="2" align="center">
            <Text role="heading" weight="medium" size="2">
              Moderator info
            </Text>
          </Flex>
        }
        right={null}
      />
      <Separator size="4" />
      {(
        [
          ['TempleOSRS data', hasTempleData],
          ['WikiSync data', hasWikiSyncData],
        ] as const
      ).map(([label, dataSource]) => (
        <DataCard.Row
          key={label}
          left={
            <Text color={dataSource ? 'green' : 'red'} size="2">
              {label}
            </Text>
          }
          right={
            <Text color={dataSource ? 'green' : 'red'}>
              {dataSource ? (
                <CheckIcon height={20} width={20} />
              ) : (
                <Cross2Icon height={20} width={20} />
              )}
            </Text>
          }
        />
      ))}
      {actionedByUsername && (
        <DataCard.Row
          left={<Text size="2">Actioned by</Text>}
          right={<Text size="2">{actionedByUsername}</Text>}
        />
      )}
    </DataCard.Root>
  );
}
