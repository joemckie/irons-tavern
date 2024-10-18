import { PropsWithChildren, ReactNode } from 'react';
import { Card, Flex, Progress, Text } from '@radix-ui/themes';
import { CombatAchievementTier } from '@/types/osrs';
import { Select } from './select';

interface DataCardRowProps {
  center: ReactNode;
  left: ReactNode;
  right: ReactNode;
}

function DataCardRow({ center, left, right }: DataCardRowProps) {
  return (
    <Flex align="center" justify="between">
      <Flex flexBasis="33%">{left}</Flex>
      <Flex flexBasis="33%" justify="center">
        {center}
      </Flex>
      <Flex flexBasis="33%" justify="end">
        {right}
      </Flex>
    </Flex>
  );
}

function DataCardRoot({ children }: PropsWithChildren) {
  return (
    <Card>
      <Flex direction="column" gap="3">
        {children}
      </Flex>
    </Card>
  );
}

export const DataCard = {
  Root: DataCardRoot,
  Row: DataCardRow,
};
