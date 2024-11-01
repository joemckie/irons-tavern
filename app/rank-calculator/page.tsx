import { Box, Button, Flex, Heading } from '@radix-ui/themes';
import { signIn } from '@/auth';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

export default async function RankCalculatorLoginPage() {
  const handleSubmit = async () => {
    'use server';

    await signIn('discord', {
      redirectTo: '/rank-calculator/players',
    });
  };

  return (
    <form action={handleSubmit}>
      <Flex
        height="100vh"
        align="center"
        justify="center"
        gap="6"
        direction="column"
      >
        <Box asChild width="450px">
          <>
            <Heading>Irons Tavern Rank Calculator</Heading>
            <Button size="3" type="submit">
              <DiscordLogoIcon />
              Log in with Discord
            </Button>
          </>
        </Box>
      </Flex>
    </form>
  );
}
