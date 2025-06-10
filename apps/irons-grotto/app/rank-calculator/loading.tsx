import { Flex, Spinner, Text } from '@radix-ui/themes';

export default function Loading() {
  return (
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
  );
}
