import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { forwardRef } from 'react';

export const Navigation = forwardRef<HTMLElement>((_props, ref) => (
  <Box
    asChild
    p="3"
    gridArea="nav"
    style={{
      borderBottom: '1px solid var(--gray-5)',
    }}
  >
    <nav ref={ref}>
      <Flex align="center" justify="between">
        <Text weight="bold">Irons Tavern rank calculator</Text>
        <Button variant="surface">Submit</Button>
      </Flex>
    </nav>
  </Box>
));

Navigation.displayName = 'Navigation';
