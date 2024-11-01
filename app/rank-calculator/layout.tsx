import '@radix-ui/themes/styles.css';
import { PropsWithChildren, Suspense } from 'react';
import { Flex, Spinner, Text, Theme } from '@radix-ui/themes';

export default async function RankCalculatorLayout({
  children,
}: PropsWithChildren) {
  return (
    <Theme
      accentColor="iris"
      appearance="dark"
      id="theme-root"
      panelBackground="solid"
    >
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
    </Theme>
  );
}
