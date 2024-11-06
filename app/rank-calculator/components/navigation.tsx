import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useFormState } from 'react-hook-form';

export function Navigation() {
  const { isValid, isSubmitting } = useFormState();

  return (
    <Box
      asChild
      p="3"
      gridArea="nav"
      position={{
        initial: 'fixed',
        md: 'static',
      }}
      right={{
        initial: '0',
        md: 'auto',
      }}
      left={{
        initial: '0',
        md: 'auto',
      }}
      style={{
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--gray-5)',
        zIndex: 100,
      }}
    >
      <nav role="navigation">
        <Flex align="center" justify="between">
          <Text weight="bold">Irons Tavern rank calculator</Text>
          <Button
            role="button"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            variant="surface"
          >
            Submit
          </Button>
        </Flex>
      </nav>
    </Box>
  );
}
