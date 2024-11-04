import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useFormState } from 'react-hook-form';

export function Navigation() {
  const { isDirty, isValid, isSubmitting } = useFormState();

  return (
    <Box
      asChild
      p="3"
      gridArea="nav"
      style={{
        borderBottom: '1px solid var(--gray-5)',
      }}
    >
      <nav role="navigation">
        <Flex align="center" justify="between">
          <Text weight="bold">Irons Tavern rank calculator</Text>
          <Button
            role="button"
            loading={isSubmitting}
            disabled={!isDirty || !isValid || isSubmitting}
            variant="surface"
          >
            Submit
          </Button>
        </Flex>
      </nav>
    </Box>
  );
}
