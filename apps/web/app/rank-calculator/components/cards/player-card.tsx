import { Flex, Separator, Text } from '@radix-ui/themes';
import { useFormContext, useWatch } from 'react-hook-form';
import { format } from 'date-fns';
import { DataCard } from '../data-card';
import { useCalculatorScaling } from '../../hooks/point-calculator/use-calculator-scaling';
import { formatPercentage } from '../../utils/format-percentage';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { Input } from '../input';

export function PlayerCard() {
  const {
    register,
    formState: { defaultValues },
  } = useFormContext<RankCalculatorSchema>();
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
          <Text role="heading" weight="medium" size="2">
            Player
          </Text>
        }
        right={
          <Text aria-label="Player name" weight="medium" size="2">
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
        right={
          <Text aria-label="Join date" size="2">
            {format(joinDate, 'dd MMM yyyy')}
          </Text>
        }
      />
      <DataCard.Row
        left={
          <Text color="gray" size="2">
            Scaling
          </Text>
        }
        right={
          <Text aria-label="Point scaling" size="2">
            {formatPercentage(scaling)}
          </Text>
        }
      />
      <Flex gap="4" align="center">
        <Text color="gray" size="2">
          Proof Link
        </Text>
        <Flex asChild justify="end" flexShrink="1" flexGrow="1" flexBasis="0">
          <Input
            {...register('proofLink')}
            defaultValue={defaultValues?.proofLink ?? ''}
            size="1"
            hasError={false}
          />
        </Flex>
      </Flex>
    </DataCard.Root>
  );
}
