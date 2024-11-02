import { Separator, Text } from '@radix-ui/themes';
import { useWatch } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { format } from 'date-fns';
import { DataCard } from '../data-card';
import { useCalculatorScaling } from '../../hooks/point-calculator/use-calculator-scaling';
import { formatPercentage } from '../../utils/format-percentage';

export function PlayerCard() {
  const playerName = useWatch<FormData, 'playerName'>({ name: 'playerName' });
  const joinDate = useWatch<FormData, 'joinDate'>({ name: 'joinDate' });
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
            Join Date
          </Text>
        }
        center={
          <Text aria-label="Join date" size="2">
            {format(joinDate, 'dd MMM yyyy')}
          </Text>
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
