import '@radix-ui/themes/styles.css';
import { PropsWithChildren, Suspense } from 'react';
import { Flex, Spinner, Text } from '@radix-ui/themes';

export default async function RankCalculatorFormLayout({
  children,
}: PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <Flex
          align="center"
          justify="center"
          height="100vh"
          direction="column"
          gap="3"
        >
          <Spinner size="3" />
          <Text>Loading...</Text>
        </Flex>
      }
    >
      {children}
    </Suspense>
  );
}
