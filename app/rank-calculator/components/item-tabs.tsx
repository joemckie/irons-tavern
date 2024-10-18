import { Flex, TabNav } from '@radix-ui/themes';
import Link from 'next/link';
import { forwardRef } from 'react';
import { useGetItems } from '../hooks/use-get-items';

export const ItemTabs = forwardRef<HTMLDivElement>((_props, forwardedRef) => {
  const { data } = useGetItems();

  return (
    <Flex
      justify="center"
      gridArea="tabs"
      direction="column"
      ref={forwardedRef}
      style={{ zIndex: '1' }}
    >
      <TabNav.Root>
        {data.map(([category]) => (
          <TabNav.Link key={category} asChild>
            <Link href="/rank-calculator">{category}</Link>
          </TabNav.Link>
        ))}
      </TabNav.Root>
    </Flex>
  );
});

ItemTabs.displayName = 'ItemTabs';
