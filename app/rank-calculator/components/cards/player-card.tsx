import { Separator, Text } from '@radix-ui/themes';
import { useWatch } from 'react-hook-form';
import { DataCard } from '../data-card';
import { DatePicker } from '../date-picker';

export function PlayerCard() {
  const playerName = useWatch({ name: 'playerName' });

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Text weight="bold" size="2">
            Player
          </Text>
        }
        right={
          <Text weight="bold" size="2">
            {playerName}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Join Date
          </Text>
        }
        center={<DatePicker name="joinDate" placeholderText="dd-mm-yyyy" />}
        right={
          <Text size="2" color="gray">
            100%
          </Text>
        }
      />
    </DataCard.Root>
  );
}
