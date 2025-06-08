import { Button, Flex, Heading } from '@radix-ui/themes';
import { signIn } from '@/auth';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function LoginPage() {
  const handleSubmit = async () => {
    'use server';

    await signIn('discord', { redirectTo: '/rank-calculator' });
  };

  return (
    <form action={void handleSubmit}>
      <Flex
        height="100vh"
        align="center"
        justify="center"
        gap="6"
        direction="column"
      >
        <Heading size="5">Irons Tavern</Heading>
        <Button size="3" type="submit">
          <DiscordLogoIcon />
          Sign in with Discord
        </Button>
      </Flex>
    </form>
  );
}
