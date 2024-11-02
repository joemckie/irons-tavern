import { Separator, Text } from '@radix-ui/themes';
import { useWatch } from 'react-hook-form';
import { DataCard } from '../data-card';
import { DatePicker } from '../date-picker';
import { useCalculatorScaling } from '../../hooks/point-calculator/use-calculator-scaling';
import { formatPercentage } from '../../utils/format-percentage';

export function PlayerCard() {
  const playerName = useWatch({ name: 'playerName' });
  const scaling = useCalculatorScaling();

  return (
    <DataCard.Root>
      <DataCard.Row
        left={
          <Text role="heading" weight="bold" size="2">
            Player
          </Text>
        }
        right={
          <Text aria-label="Player name" weight="bold" size="2">
            {decodeURIComponent(playerName)}
          </Text>
        }
      />
      <Separator size="4" />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            <label htmlFor="join-date">Join Date</label>
          </Text>
        }
        center={
          <DatePicker
            id="join-date"
            name="joinDate"
            placeholderText="dd-mm-yyyy"
            required
          />
        }
        right={
          <Text aria-label="Point scaling" size="2" color="gray">
            {formatPercentage(scaling)}
          </Text>
        }
      />
    </DataCard.Root>
  );
}
