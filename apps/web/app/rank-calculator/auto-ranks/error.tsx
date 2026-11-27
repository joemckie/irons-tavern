"use client";

import { Button, Callout, Flex, Heading, Text } from "@radix-ui/themes";

export default function AutoRanksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Flex direction="column" gap="4" p="6" align="start">
      <Heading>Auto-rank checker</Heading>
      <Callout.Root color="red">
        <Callout.Text>
          The report couldn&apos;t be built. No ranks are shown when any data source fails.
        </Callout.Text>
        {error.digest && (
          <Callout.Text>
            <Text size="1">Error reference: {error.digest}</Text>
          </Callout.Text>
        )}
      </Callout.Root>
      <Button onClick={reset}>Try again</Button>
    </Flex>
  );
}
