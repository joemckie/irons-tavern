import { PropsWithChildren, ReactNode } from 'react';
import { Card, Flex } from '@radix-ui/themes';

interface DataCardRowProps {
  center?: ReactNode;
  left: ReactNode;
  right: ReactNode;
}

function DataCardRow({ center = null, left, right }: DataCardRowProps) {
  const width = center ? '33%' : '50%';

  return (
    <Flex align="center" justify="between">
      <Flex flexBasis={width}>{left}</Flex>
      {center && (
        <Flex flexBasis={width} justify="center">
          {center}
        </Flex>
      )}
      <Flex flexBasis={width} justify="end">
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
