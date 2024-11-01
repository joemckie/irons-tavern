import { Button, Flex, Heading } from '@radix-ui/themes';
import { auth, signIn } from '@/auth';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { redirect } from 'next/navigation';

export default async function RankCalculatorLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/rank-calculator/players');
  }

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
        <Heading size="5">Irons Tavern Rank Calculator</Heading>
        <Button size="3" type="submit">
          <DiscordLogoIcon />
          Sign in with Discord
        </Button>
      </Flex>
    </form>
  );
}
