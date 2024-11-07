import { Separator, Text } from '@radix-ui/themes';
import { useFormContext, useWatch } from 'react-hook-form';
import { format } from 'date-fns';
import { DataCard } from '../data-card';
import { useCalculatorScaling } from '../../hooks/point-calculator/use-calculator-scaling';
import { formatPercentage } from '../../utils/format-percentage';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { Input } from '../input';

export function PlayerCard() {
  const { register } = useFormContext<RankCalculatorSchema>();
  const playerName = useWatch<RankCalculatorSchema, 'playerName'>({
    name: 'playerName',
  });
  const joinDate = useWatch<RankCalculatorSchema, 'joinDate'>({
    name: 'joinDate',
  });
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
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Proof Link
          </Text>
        }
        center={<Input {...register('proofLink')} size="1" hasError={false} />}
        right={
          <Text size="2" color="gray">
            Test
          </Text>
        }
      />
    </DataCard.Root>
  );
}
